import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { continueStory, generateImage } from "~/services/openai";
import { messageSchema } from "~/services/openai/schema";

export const openAIRouter = createTRPCRouter({
  generateText: publicProcedure
    .input(
      z.object({ storyText: z.string(), messages: z.array(messageSchema) }),
    )
    .query(async ({ input }) => {
      const { storyText, messages } = input;

      const nextPartStory = await continueStory(storyText, messages);

      return nextPartStory;
    }),

  generateImage: publicProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ input }) => {
      const { description } = input;

      const imageUrl = await generateImage(description);
      return imageUrl;
    }),
});
