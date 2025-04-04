/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import redis from "../redis";
import { env } from "~/env";
import { decodeToken } from "../tools/token";
import APP_CONFIG from "~/config/app";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
    redis,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const verifyUser = t.middleware(async ({ ctx, next }) => {
  // parse token "Bearer ****token****" -> *****token*****
  const tokenLine = ctx.headers.get("authorization");
  const token = tokenLine!.toString().split(" ").at(1);  

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // decode token -> {id:string}, the `user` non-nullable
  const user = await decodeToken({ token, secret: env.JWT_SECRET });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // get num of user games and compare with limit 
  const numGames = await ctx.redis.get(`user:${user.id}`);

  const games = Number(numGames);
  
  if(games >= APP_CONFIG.GAME_LIMIT){
	throw new TRPCError({code: "FORBIDDEN", message: "Game limit expired"})
  }

  return next({ ctx: { session: { user} } });
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API.
 * */

export const publicProcedure = t.procedure.use(timingMiddleware);

/*
 * Private (authenticated) procedure
 *
 * Only users who have a token can use this type of procedure.
 * It is created to limit user game sessions per day to save money
 * on the OpenAI API.
 * */

export const privateProcedure = t.procedure.use(verifyUser);
