"use client";

import { motion } from "framer-motion";
import { usePathnameInclude } from "~/hooks/usePathInclude";
import { CoffeeIcon, InfoIcon, LogoIcon } from "./svgs";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const BuyMeCoffeeLink = "https://buymeacoffee.com/andriiveremchuk";

export default function Footer() {
  const isHomePage = !usePathnameInclude("/h");

  return (
    <footer
      className={twMerge(
        "bottom-0 flex h-[100px] w-full items-center justify-between px-5",
        isHomePage ? "fixed" : "",
      )}
    >
      <Link href={"/"} className="cursor-pointer">
        <LogoIcon className="text-6xl" />
      </Link>
      {/*<div className="text-sm">© Monkey Dev Lab</div> */}
      <div className="flex space-x-5">
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
  );
}
