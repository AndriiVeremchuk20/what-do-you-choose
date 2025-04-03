"use client";

import Link from "next/link";
import { BackArrowIcon } from "~/components/svgs";

export default function EndStory() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="mb-4 text-4xl font-bold">The End..</div>
      <div className="mb-6 text-lg opacity-80">We hope you enjoyed</div>
      <Link
        href="/stories"
        className="flex items-center space-x-3 duration-300 hover:scale-95 hover:space-x-2"
      >
        <BackArrowIcon /> <span>Back to all stories</span>
      </Link>
    </main>
  );
}
