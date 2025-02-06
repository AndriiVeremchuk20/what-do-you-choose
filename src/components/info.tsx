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

const InfoBodyItem = () => {
  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

const InfoBody = () => {
  return (
    <div className="grid h-full w-full gap-4 sm:grid-cols-1 sm:grid-rows-4 lg:grid-cols-2 lg:grid-rows-2">
	
	This page currently in dev

	{/*<div className="flex flex-col items-center justify-between">
        <div>🚀 Click start</div>
        <div></div>
        <div>Step: 1</div>
      </div>
      <div className="">
        <div>📚 Choose a story template</div>
        <div></div>
        <div>Step: 2</div>
      </div>
      <div className="">
        <div>📝 Make choices to generate a story</div>
        <div></div>
        <div>Step: 3</div>
      </div>
      <div className="">
        <div>🎉 Enjoy</div>
        <div></div>
        <div>Step: 4</div>
      </div>{" "*/}
    </div>
  );
};

const Info = () => {
  return (
    <div className="flex flex-col rounded-xl bg-black p-4 sm:h-full sm:w-full lg:h-4/5 lg:w-3/4">
      <InfoHeader />
      <InfoBody />
    </div>
  );
};

export default Info;
