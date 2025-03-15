import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export const StoryNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <TypeAnimation
        sequence={["Story not found"]}
        cursor={false}
        speed={20}
        className="text-6xl"
      />

      <Link href="/stories">
        <TypeAnimation
          sequence={["PAGE NOT FOUND..."]}
          cursor={false}
          className="text-4xl"
          speed={10}
        />
      </Link>
    </div>
  );
};
