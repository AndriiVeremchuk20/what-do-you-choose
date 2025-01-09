"use client";

import { useRouter } from "next/navigation";
import { Button } from "./lib";

export default function Welcome() {
  const router = useRouter();

  const handleStartClick = () => {
    return router.push("/histories");
  };

  return (
    <div className="flex w-[30%] flex-col items-center justify-center space-y-5 rounded-xl border-2 px-3 py-10 text-4xl">
      <h1 className="text-5xl">Welcome</h1>
      <Button onClick={handleStartClick}>Start</Button>
    </div>
  );
}
