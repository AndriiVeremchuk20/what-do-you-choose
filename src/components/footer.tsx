"use client";

import { motion } from "framer-motion";
import { usePathnameInclude } from "~/hooks/usePathInclude";
import {
  CoffeeIcon,
  InfoIcon,
  LogoIcon,
  MusicOffIcon,
  MusicOnIcon,
} from "./svgs";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useAppStore } from "~/store";

const BuyMeCoffeeLink = "https://buymeacoffee.com/andriiveremchuk";

export default function Footer() {
  const isHomePage = !usePathnameInclude("/s");

  const { playMusic } = useAppStore();

  const handleSoundClick = () => {
    useAppStore.setState((prev) => ({ playMusic: !prev.playMusic }));
  };

  return (
    <>
      <footer
        className={twMerge(
          "bottom-0 flex h-[100px] w-full items-center justify-between px-5",
          isHomePage ? "fixed" : "",
        )}
      >
        <Link href={"/"} className="cursor-pointer">
          <LogoIcon className="text-6xl" />
        </Link>
        <div className="flex space-x-5">
          <motion.button onClick={handleSoundClick}>
            {playMusic ? (
              <MusicOffIcon className="text-6xl" />
            ) : (
              <MusicOnIcon className="text-6xl" />
            )}
          </motion.button>

          <motion.div
            whileHover={{
              rotate: [0, 5, -5, 5, 0 - 5, 0],
              transition: { duration: 0.5 },
            }}
          >
            <Link href={"/info"}>
              <InfoIcon className="text-6xl" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              rotate: [0, 10, -10, 10, -10, 0],
              transition: { duration: 0.5 },
            }}
          >
            <Link href={BuyMeCoffeeLink} passHref legacyBehavior>
              <a target="_blank">
                <CoffeeIcon className="text-6xl" />
              </a>
            </Link>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
