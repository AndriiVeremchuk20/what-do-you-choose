import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { continueStory } from "~/services/openai";
import { messageSchema } from "~/services/openai/schema";

export const gameRouter = createTRPCRouter({
  generateText: publicProcedure
    .input(
      z.object({ storyText: z.string(), messages: z.array(messageSchema) }),
    )
    .query(async ({ input }) => {
      const { storyText, messages } = input;

      try {
        // generate next part of story
        const nextPartStory = await continueStory(storyText, messages);

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
