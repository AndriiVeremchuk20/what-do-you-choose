"use client"

import {usePathnameInclude} from "~/hooks/usePathInclude";
import {CoffeeIcon, InfoIcon, LogoIcon} from "./svgs";
import {twMerge} from "tailwind-merge";


export default function Footer() {

	const isHomePage = !usePathnameInclude("/h");	

  return (
    <footer className={twMerge("bottom-0 flex h-[100px] w-full items-center justify-between px-5", isHomePage?"fixed":"")}>
      <div>
	    <LogoIcon className="text-6xl"/>
      </div>
      <div className="flex space-x-5">
        <div>
		  <InfoIcon className="text-6xl"/>
		</div>
        <div>
			<CoffeeIcon className="text-6xl"/>
		</div>
      </div>
    </footer>
  );
}
