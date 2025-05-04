"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useGameStore from "@/stores/game-store";
import clsx from "clsx";
import { Clock2, Clock3, Clock4, ClockFading } from "lucide-react";
import { useState } from "react";

export default function GameSettings() {
	const [customScore, setCustomScore] = useState(501);
	const startingScore = useGameStore((state) => state.startingScore);
	const initGameScore = useGameStore((state) => state.initGameScore);

	return (
		<div className="space-y-2">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl">Game Settings</h2>
				<p className="text-muted-foreground">Configure your game settings</p>
			</div>

			<h3>Starting Score</h3>
			<div className="grid grid-cols-3 gap-2">
				<Card
					className={clsx("cursor-pointer", {
						"border-green-500 bg-green-500/10": startingScore === 101,
					})}
					onClick={() => initGameScore(101)}
				>
					<CardContent className="flex flex-col gap-2 items-center">
						<Clock2 className="size-14" />
						<p>Shorter - 101</p>
					</CardContent>
				</Card>

				<Card
					className={clsx("cursor-pointer", {
						"border-green-500 bg-green-500/10": startingScore === 201,
					})}
					onClick={() => initGameScore(201)}
				>
					<CardContent className="flex flex-col gap-2 items-center">
						<Clock3 className="size-14" />
						<p>Medium - 201</p>
					</CardContent>
				</Card>

				<Card
					className={clsx("cursor-pointer", {
						"border-green-500 bg-green-500/10": startingScore === 301,
					})}
					onClick={() => initGameScore(301)}
				>
					<CardContent className="flex flex-col gap-2 items-center">
						<Clock4 className="size-14" />
						<p>Longer - 301</p>
					</CardContent>
				</Card>

				<Popover>
					<PopoverTrigger asChild>
						<Card
							className={clsx("cursor-pointer", {
								"border-green-500 bg-green-500/10":
									startingScore !== 301 && startingScore !== 201 && startingScore !== 101,
							})}
						>
							<CardContent className="flex flex-col gap-2 items-center">
								<ClockFading className="size-14" />
								<p>
									Custom
									{startingScore === 301 || startingScore === 201 || startingScore === 101
										? null
										: ` - ${startingScore}`}
								</p>
							</CardContent>
						</Card>
					</PopoverTrigger>
					<PopoverContent className="space-y-2">
						<p>Starting Score Value</p>
						<Input
							value={customScore}
							onChange={(e) => setCustomScore(Number(e.target.value))}
							type="number"
						/>
						<Button variant={"outline"} onClick={() => initGameScore(customScore)}>
							Set Score
						</Button>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
