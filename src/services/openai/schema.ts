import { z } from "zod";

export const responseStorySchema = z.object({
  story: z.string(),
  options: z.array(z.string()),
});

export type Story = z.infer<typeof responseStorySchema>;

export const parseStory = (rawText: string): Story => {
  try {
    const jsonData = JSON.parse(rawText) as Story;
    const parsedData = responseStorySchema.parse(jsonData);

    return parsedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const messageSchema = z.object({
  role: z.enum(["developer", "assistant", "user"]),
  content: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
