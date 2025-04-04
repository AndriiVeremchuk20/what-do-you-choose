import React from "react";
import { twMerge } from "tailwind-merge";

type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export const Box = (props: BoxProps) => {
  return (
    <div {...props} className={twMerge(props.className, "h-full w-full p-5")} />
  );
};
