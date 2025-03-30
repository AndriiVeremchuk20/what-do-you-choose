import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { continueStory } from "~/services/openai";
import { messageSchema } from "~/services/openai/schema";
import {v4 as uuid} from "uuid";

export const gameRouter = createTRPCRouter({
  // create room (save progress after page reflesh)
  createRoom: publicProcedure.input(z.object({})).mutation(async ({ctx: {redis}}) => {
    const roomId = uuid();
    //ctx.redis.l(`room:${roomId}`, );    

  }),
  connectToRoom: publicProcedure.input(z.object({})).query(() => {}),

  generateText: publicProcedure
    .input(
      z.object({ storyText: z.string(), messages: z.array(messageSchema) }),
    )
    .mutation(async ({ input, ctx }) => {
      const { storyText, messages } = input;

      console.log(input);

      try {
        const nextPartStory = await continueStory(storyText, messages);

        console.log(nextPartStory);

        return nextPartStory;
      } catch (error) {
        console.log("[ !!! ] Error", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  generateImage: publicProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({}) => {
      //const { description } = input;

      //const imageUrl = await generateImage(description);
      return "hello"; //imageUrl;
    }),
});
