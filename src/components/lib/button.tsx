import { type HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type ButtonProps = HTMLMotionProps<"button">;

export const Button = (props: ButtonProps) => {
  return (
    <motion.button
      className={twMerge(props.className, "h-full w-full border-2 px-5 py-3")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      whileFocus={{ scale: 1.1 }}
      {...props}
    />
  );
};
