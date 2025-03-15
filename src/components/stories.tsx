"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type Story } from "~/config/stories";

export const StoryList = ({ arr }: { arr: Story[] }) => {
  return (
    <motion.div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {arr.map((data) => (
        <StoryCard data={data} key={data.id} />
      ))}
    </motion.div>
  );
};

export const StoryCard = ({ data }: { data: Story }) => {
  const { id, name, image } = data;

  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex cursor-pointer flex-col items-center border-2 p-4 duration-300 hover:bg-neutral-800"
      onClick={() => router.push(`/story/${id}`)}
    >
      <Image
        alt={`${name}-image`}
        width={400}
        height={400}
        src={image}
        className="blur-[1px] duration-300 hover:blur-none"
      />
      <div className="text-center">{name}</div>
    </motion.div>
  );
};
