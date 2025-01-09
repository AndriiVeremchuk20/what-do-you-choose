import * as motion from "motion/react-client";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <motion.button
      className={twMerge(props.className, "rounded-lg border-2 px-5 py-3")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      {...props}
    />
  );
};
