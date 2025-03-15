"use client";

import { useRouter } from "next/navigation";
import { Button } from "./lib";
import { BackArrowIcon } from "./svgs";

const InfoHeader = () => {
  const router = useRouter();

  const handleGoBackClick = () => {
    router.back();
  };

  return (
    <div className="flex border-b-2 pb-4">
      <Button className="flex items-center" onClick={handleGoBackClick}>
        <BackArrowIcon width={34} />
        Go Back
      </Button>
    </div>
  );
};

const InfoBody = () => {
  return (
    <div className="flex flex-col justify-between space-y-3 p-3 py-3">
      <p>
        🎉 Welcome to the &quotWhat Do You Choose&quot game, where you can
        create your own unique story! 📖✨
      </p>
      <p>🌿 Here, you can relax and dive into a story that never ends. 🔄📜</p>
      <p>
        💡 If you have any questions or proposals, you can always write to ✉️
        monkey.dev.lab@gmail.com.
      </p>
      <p>🚀 We hope you enjoy our projects! 🎮❤️</p>
    </div>
  );
};

const Info = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-black p-2 sm:h-screen sm:w-full lg:h-4/5 lg:w-3/4">
      <InfoHeader />
      <InfoBody />
    </div>
  );
};

export default Info;
