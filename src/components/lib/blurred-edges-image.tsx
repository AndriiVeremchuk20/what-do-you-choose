import Image from "next/image";

export const BlurredEdgesImage = ({ url }: { url: string }) => {
  return (
    <div className="relative h-80 w-80">
      <Image
        src={url}
        width={400}
        height={400}
        alt="Example"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl">
        <div className="absolute left-0 top-0 h-5 w-full bg-gradient-to-b from-black to-transparent backdrop-blur-xl"></div>
        <div className="absolute bottom-0 left-0 h-5 w-full bg-gradient-to-t from-black to-transparent backdrop-blur-sm"></div>
        <div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-black to-transparent backdrop-blur-sm"></div>
        <div className="absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-black to-transparent backdrop-blur-sm"></div>
      </div>
    </div>
  );
};
