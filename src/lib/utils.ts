import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function randomColor() {
	const randomNum = Math.floor(Math.random() * 16777216);

	let hexCode = randomNum.toString(16);

	while (hexCode.length < 6) {
		hexCode = `0${hexCode}`;
	}

	return `#${hexCode}`;
}
