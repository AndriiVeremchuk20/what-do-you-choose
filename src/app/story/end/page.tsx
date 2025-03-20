"use client"

import Link from "next/link";
import {BackArrowIcon} from "~/components/svgs";

export default function EndStory(){

	return <main className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
    <div className="text-4xl font-bold mb-4">The End..</div>
    <div className="text-lg mb-6 opacity-80">We hope you enjoyed</div>
    <Link href="/stories" className="hover:scale-95 duration-300 flex space-x-3 items-center hover:space-x-2">
      <BackArrowIcon/> <span>Back to all stories</span>
    </Link>
  </main>
}
