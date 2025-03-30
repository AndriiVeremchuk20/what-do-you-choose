import OpenAI, { OpenAIError } from "openai";
import { env } from "~/env";
import { type Message, parseStory } from "./schema";

const OpenAIClient = new OpenAI({ apiKey: env.OPEN_AI_API_KEY });

const continueStory = async (storyText: string, messages: Message[]) => {
  const response = await OpenAIClient.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: "You're a generator of interesting stories",
      },
      {
        role: "user",
        content: `Continue story (30 - 50 words) (${storyText}) and propose user 2 ways to answer. language (ukr), use emoji`,
      },
      ...messages,
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "story_schema",
        schema: {
          type: "object",
          properties: {
            story: {
              type: "string",
              description: "Continued part of the story",
            },
            options: {
              type: "array",
              description:
                "List of options (2) for the user to choose, shortly with emoji",
              items: { type: "string" },
            },
            isEnd: {
              type: "boolean",
              description: "Boolean value that shows is end of story or not",
              items: { type: "boolean" },
            },
          },
          required: ["story", "options", "isEnd"],
        },
      },
    },
  });

  if (!response.choices[0]?.message.content)
    throw new OpenAIError("Invalid response");

  const { content } = response.choices[0]?.message;

  const jsonData = parseStory(content);

  return jsonData;
};

const generateImage = async (description: string) => {
  const response = await OpenAIClient.images.generate({
    model: "dall-e-2",
    prompt: `generate pixel art image (white and black) for ${description}`,
    n: 1,
    size: "1024x1024",
  });

  return response.data[0]!.url;
};

export { continueStory, generateImage };
