"use client";
import Image from "next/image";
import { useState } from "react";
import { Button, Box } from "~/components/lib";
import { TypeAnimation } from "react-type-animation";
import { api } from "~/trpc/react";
import { type Message } from "~/services/openai/schema";
import { Loader } from "~/components/lib/loader";
import { motion } from "framer-motion";
import { type Story } from "~/config/stories";

export const Game = ({ storyTemplate }: { storyTemplate: Story }) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [typed, setTyped] = useState<boolean>(false);
  const [storySteps, setStorySteps] = useState<Message[]>([]);

  const nextStoryMutation = api.game.generateText.useMutation({});

  const {mutate: startGame} = api.game.startStory.useMutation({onSuccess(data){
	console.log(data);},

	onError(e){
		console.log(e);
	}
  });

  const handleOptionClick = (value: string) => {
    setStorySteps((prev) => [
      ...prev,
      { role: "assistant", content: nextStoryMutation.data!.story },
      { role: "user", content: value },
    ]);

    nextStoryMutation.mutate({
      storyText: storyTemplate.description,
      messages: storySteps.slice(-5),
    });
  };

  const handleAnimationEnd = () => setTyped(true);

  const handleStartClick = () => {
    setIsStarted(true);

	startGame();

    nextStoryMutation.mutate({
      storyText: storyTemplate.description,
      messages: storySteps,
    });
  };

  if (!isStarted)
    return (
      <main className="flex h-screen p-10">
        <Box className="flex flex-col justify-center">
          <Image
            src={storyTemplate.image}
            width={400}
            height={400}
            alt={storyTemplate.name}
            className="self-center"
          />
          <TypeAnimation
            className="my-5"
            sequence={[
              storyTemplate.description,
              3000,
              () => handleAnimationEnd(),
            ]}
            speed={25}
            repeat={1}
          />
          <Button className="w-fit self-center" onClick={handleStartClick}>
            Continue
          </Button>
        </Box>
      </main>
    );
  else if (nextStoryMutation.isPending)
    return (
      <main className="felx h-screen items-center justify-center">
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
              sequence={[nextStoryMutation.data?.story ?? "something happend"]}
              speed={30}
              repeat={1}
            />
          </div>

          {typed && (
            <motion.div className="flex h-full w-full flex-col items-start justify-center gap-10 sm:flex-col lg:flex-row">
              {nextStoryMutation.data?.options.map((o, i) => (
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
                  <Button type="button" onClick={() => handleOptionClick(o)}>
                    {o}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Box>
    </main>
  );
};
