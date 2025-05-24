"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban, Target } from "lucide-react";
import { useState } from "react";

const points = new Array(20).fill(0);

export default function Spaces() {
	const [selected, setSelected] = useState<number>(-2);
	const [multiplier, setMultiplier] = useState(1);

	return (
		<div className="flex flex-col gap-4 justify-between rounded-md w-full h-full border border-border p-4 ">
			<div className="space-y-2">
				<div className="w-full bg-card p-4 rounded-md border border-border">
					<p>Round Score:</p>
				</div>

				<div className="space-y-2 grow">
					<div className="grid grid-cols-2 gap-2">
						<Button
							variant={multiplier === 2 ? "default" : "outline"}
							onClick={() => setMultiplier((prev) => (prev === 2 ? 1 : 2))}
							className="w-full text-xl py-8"
							disabled={selected === -2 || selected === -1 || selected === 25 || selected === 50}
						>
							Double
						</Button>
						<Button
							variant={multiplier === 3 ? "default" : "outline"}
							onClick={() => setMultiplier((prev) => (prev === 3 ? 1 : 3))}
							className="w-full text-xl py-8"
							disabled={selected === -2 || selected === -1 || selected === 25 || selected === 50}
						>
							Triple
						</Button>
					</div>

					<div className="grid grid-cols-4 gap-2">
						<ScoreButton score={-1} selected={selected} onClick={() => setSelected(-1)} />
						{points.map((_, i) => (
							<ScoreButton key={i} score={i} selected={selected} onClick={() => setSelected(i)} />
						))}
						<ScoreButton score={25} selected={selected} onClick={() => setSelected(25)} />
						<ScoreButton score={50} selected={selected} onClick={() => setSelected(50)} />
					</div>
				</div>
			</div>

			<div>
				<Button className="w-full py-8 flex items-center" variant={"outline"}>
					<Target /> Show Dartboard
				</Button>
			</div>
		</div>
	);
}

function ScoreButton({
	score,
	selected,
	...props
}: { score: number; selected: number } & React.ComponentProps<typeof Button>) {
	return (
		<Button
			variant={selected === score ? "default" : "outline"}
			className="text-xl py-8"
			{...props}
		>
			<p>{score === -1 ? <Ban /> : score}</p>
		</Button>
	);
}

