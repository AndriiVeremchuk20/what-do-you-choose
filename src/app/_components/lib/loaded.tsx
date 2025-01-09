import { TypeAnimation } from "react-type-animation";

export const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <TypeAnimation
        sequence={["Story Generation", 100, "Please Wait", 100]}
        repeat={10}
        speed={10}
      />
    </div>
  );
};
