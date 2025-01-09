"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Box } from "~/app/_components/lib";
import { TypeAnimation } from "react-type-animation";
import { api } from "~/trpc/react";
import { useStory } from "~/app/_hooks/useStory";
import {type Message } from "~/services/openai/schema";
import { Loader } from "~/app/_components/lib/loaded";

export default function HistoryPage() {
  const story = useStory();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [typed, setTyped] = useState<boolean>(false);
  const [storySteps, setStorySteps] = useState<Message[]>([]);

  const nextStoryMutation = api.openai.generateText.useMutation({
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleOptionClick = (option: string) => {
    setStorySteps((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextStoryMutation.data?.story ?? "improvisate",
      },
      { role: "user", content: option },
    ]);


  };

  const handleAnimationEnd = () => setTyped(true);

  useEffect(() => {
    if (isStarted)
      nextStoryMutation.mutate({ storyText:story?.description ?? "red potato", messages: storySteps });
  }, 
// eslint-disable-next-line
  [isStarted, storySteps]);

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

  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <Box>
        {nextStoryMutation.isPending ? (
          <Loader />
        ) : (
          <>
            <TypeAnimation
              className="self-start text-left"
              sequence={[nextStoryMutation.data?.story ?? "red potato"]}
              speed={30}
              repeat={2}
            />

            {typed && (
              <div className="flex justify-center space-x-5">
                {nextStoryMutation.data?.options.map((o, i) => (
                  <Button key={i} onClick={() => handleOptionClick(o)}>
                    {o}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </Box>
    </main>
  );
}
