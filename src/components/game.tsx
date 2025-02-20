"use client";
import Image from "next/image";
import { useState } from "react";
import { Button, Box } from "~/components/lib";
import { TypeAnimation } from "react-type-animation";
import { api } from "~/trpc/react";
import { useStory } from "~/hooks/useStory";
import { type Message } from "~/services/openai/schema";
import { Loader } from "~/components/lib/loader";
import { motion } from "framer-motion";

const Game = () => {
  const story = useStory();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [typed, setTyped] = useState<boolean>(false);
  const [storySteps, setStorySteps] = useState<Message[]>([]);

  const nextStoryQuery = api.game.generateText.useQuery(
    { storyText: story?.description ?? "ping", messages: storySteps },
    {
      enabled: isStarted,
    },
  );

  const handleOptionClick = (option: string) => {
    setStorySteps((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextStoryQuery.data?.story ?? "improvisate",
      },
      { role: "user", content: option },
    ]);
  };

  const handleAnimationEnd = () => setTyped(true);

  if (!isStarted)
    return (
      <main className="flex h-screen p-10">
        <Box className="flex flex-col justify-center">
          <Image
            src={story!.image}
            width={400}
            height={400}
            alt={story!.name}
            className="self-center"
          />
          <TypeAnimation
            className="my-5"
            sequence={[story!.description, 3000, () => handleAnimationEnd()]}
            speed={25}
            repeat={1}
          />
          <Button
            className="w-fit self-center"
            onClick={() => setIsStarted(true)}
          >
            Continue
          </Button>
        </Box>
      </main>
    );
  else if (nextStoryQuery.isPending)
    return (
      <main className="flex h-screen items-center justify-center">
        <Loader />
      </main>
    );

  return (
    <main className="h-screen py-[40px]">
      <Box className="flex items-center justify-center space-y-5">
        <div className="grid h-full w-full grid-rows-2 sm:w-full md:w-3/4 lg:w-3/4">
          <div className="flex items-center">
            <TypeAnimation
              className="self-center text-left"
              sequence={[nextStoryQuery.data?.story ?? "red potato"]}
              speed={30}
              repeat={1}
            />
          </div>

          {typed && (
            <motion.div className="flex h-full w-full flex-col items-start justify-center gap-10 sm:flex-col lg:flex-row">
              {nextStoryQuery.data?.options.map((o, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 400 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.3,
                    duration: 1,
                  }}
                  key={i}
                  className="w-full"
                >
                  <Button onClick={() => handleOptionClick(o)}>{o}</Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Box>
    </main>
  );
};

export default Game;
