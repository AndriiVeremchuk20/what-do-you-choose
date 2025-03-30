import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SignJWT } from "jose";
import { createId } from "@paralleldrive/cuid2";
import { env } from "~/env";
/*
 * create user session to limit num of stories per dey
 * and save money on openAI API
 * */

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(z.object({})).mutation(async ({ctx: {redis}}) => {
    
	  const id = createId();

	  const token = await new SignJWT({ id })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(env.JWT_SECRET));

	  // save user_id: num of games
	  const res = await redis.set(`user:${id}`, 0);

	  console.log(res);

    return { token };
  }),
});
