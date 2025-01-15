"use client";

import { useRouter } from "next/navigation";
import { Button } from "./lib";

export default function Welcome() {
  const router = useRouter();

  const handleStartClick = () => {
    return router.push("/histories");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-5 px-10 py-10 text-4xl sm:w-full md:w-3/4 lg:w-2/6">
      <h1 className="text-5xl">Welcome</h1>
      <Button onClick={handleStartClick}>Start</Button>
    </div>
  );
}
