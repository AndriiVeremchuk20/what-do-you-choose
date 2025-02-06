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
  return <div className="grid grid-cols-2 grid-rows-1 w-full h-full">
	<div className="bg-red-500">Text</div>
	<div className="bg-blue-300">Text</div>
  </div>;
};

const Info = () => {
  return (
    <div className="flex h-4/5 w-3/4 flex-col rounded-xl bg-black p-4">
      <InfoHeader />
	  <InfoBody/>
    </div>
  );
};

export default Info;
