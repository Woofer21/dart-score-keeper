import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center gap-4 p-4">
			<h1 className="text-4xl font-bold">Dart Score Keeper</h1>
			<Button>Start Game</Button>
		</main>
	);
}

