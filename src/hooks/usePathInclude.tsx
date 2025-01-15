import {usePathname} from "next/navigation"

export const usePathnameInclude = (text: string): boolean => {

	const pathname = usePathname();

	return pathname.includes(text);

}

