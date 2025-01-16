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
    <div className="flex w-full flex-col items-center justify-center space-y-5 px-5 py-10 text-4xl lg:w-3/6 sm:w-full ">
      <TypeAnimation
        sequence={[
          "Welcome to the game 🎮",
          1000,
          "Create your own history 📖",
          1000,
          "Make decisions 🤔",
          1000,
          "Pump up your imagination 💭",
          1000,
		  "Click Start 🖱️🚀",
		  1000
        ]}
        speed={20}
        wrapper="span"
        repeat={Infinity}
		className="text-5xl lg:text-5xl sm:text-3xl"
      />
      <Button onClick={handleStartClick}>Start</Button>
    </div>
  );
}
