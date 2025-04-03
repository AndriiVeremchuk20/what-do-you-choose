import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createId } from "@paralleldrive/cuid2";
import { env } from "~/env";
import { encodeToken } from "~/server/tools/token";
/*
 * create user session to limit num of stories per dey
 * and save money on openAI API
 * */

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({}))
    .mutation(async ({ ctx: { redis } }) => {
      // check user token, then generate a new token or return curretn

      const id = createId();

      const token = await encodeToken({ data: { id }, secret: env.JWT_SECRET });

      // save user_id: num of games (in future value: {lang: "en"|"ua"|"fr"})
      const res = await redis.set(`user:${id}`, 0);

      console.log(res);

      return { token };
    }),
});
