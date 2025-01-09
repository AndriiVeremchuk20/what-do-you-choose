"use client";
import Image from "next/image";
import { useState } from "react";
import { Button, Box } from "~/app/_components/lib";
import { TypeAnimation } from "react-type-animation";
import { api } from "~/trpc/react";
import { useStory } from "~/app/_hooks/useStory";
import { type Message } from "~/services/openai/schema";
import { Loader } from "~/app/_components/lib/loader";

export default function HistoryPage() {
  const story = useStory();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [typed, setTyped] = useState<boolean>(false);
  const [storySteps, setStorySteps] = useState<Message[]>([]);

  const nextStoryQuery = api.openai.generateText.useQuery(
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

  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
    <div className="w-3/4">  
	<Box className="flex flex-col space-y-5">
        {nextStoryQuery.isPending ? (
          <Loader />
        ) : (
          <>
            <TypeAnimation
              className="self-start text-left"
              sequence={[nextStoryQuery.data?.story ?? "red potato"]}
              speed={30}
              repeat={2}
            />

            {typed && (
              <div className="bottom-1 flex justify-center space-x-5">
                {nextStoryQuery.data?.options.map((o, i) => (
                  <Button key={i} onClick={() => handleOptionClick(o)}>
                    {o}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </Box>
	  </div>
    </main>
  );
}
