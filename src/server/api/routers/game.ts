import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { continueStory, generateImage } from "~/services/openai";
import { messageSchema } from "~/services/openai/schema";
import Stories from "~/config/stories";
import APP_CONFIG from "~/config/app";

const {GAME_LIMIT} = APP_CONFIG;




//const checkGameLimitProcedure = privateProcedure.use();

export const gameRouter = createTRPCRouter({
  getStories: publicProcedure.input(z.object({})).query(() => {
    //get data from db (nice to have)
    const stories = [...Stories];

    return { stories };
  }),

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  startStory: privateProcedure
    .mutation(async ({ ctx: { redis, session: {user} } }) => {
	
		const {id} = user;
		const res = await redis.incr(`user:${id}`);

		if(res > GAME_LIMIT){
			throw new TRPCError({code: "FORBIDDEN", message: "Game limit per day expired"})	
		}

		return {expire_in: GAME_LIMIT - res}
    }),

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateText: privateProcedure
    .input(
      z.object({ storyText: z.string(), messages: z.array(messageSchema) }),
    )
    .mutation(async ({ input, ctx: {redis, session: {user}} }) => {

      const { storyText, messages } = input;

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateImage: publicProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({input}) => {
      //const { description } = input;

      //const imageUrl = await generateImage(description);
      return"test" //imageUrl;
    }),
});
