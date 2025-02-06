"use client";

import { useRouter } from "next/navigation";
import { Button } from "./lib";
import { TypeAnimation } from "react-type-animation";

export default function Welcome() {
  const router = useRouter();

  const handleStartClick = () => {
    return router.push("/histories");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-5 px-5 py-10 text-4xl sm:w-full lg:w-3/6">
      <TypeAnimation
        sequence={[
          "Welcome to the game 🎮",
          1000,
          "Create own history 📖",
          1000,
          "Make decisions 🤔",
          1000,
          "Unleash creativity 💭",
          1000,
          "Click Start 🖱️🚀",
          1000,
        ]}
        speed={20}
        wrapper="span"
        repeat={Infinity}
        className="text-2xl sm:text-2xl lg:text-5xl"
      />
      <Button onClick={handleStartClick}>Start</Button>
    </div>
  );
}
