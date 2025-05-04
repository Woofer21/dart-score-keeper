import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center gap-4 p-4">
			<h1 className="text-4xl font-bold">Dart Score Keeper</h1>
			<Link href={"/start"}>
				<Button>Start Game</Button>
			</Link>
		</main>
	);
}

