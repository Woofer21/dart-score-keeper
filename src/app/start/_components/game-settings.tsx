"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import useGameStore from "@/stores/game-store";
import {
	ClockCountdownIcon,
	HourglassHighIcon,
	HourglassLowIcon,
	HourglassMediumIcon,
	type IconProps
} from "@phosphor-icons/react";
import clsx from "clsx";
import { type ForwardRefExoticComponent, useState } from "react";

export default function GameSettings() {
	const [customScore, setCustomScore] = useState(601);
	const startingScore = useGameStore((state) => state.startingScore);
	const initGameScore = useGameStore((state) => state.initGameScore);

	return (
		<div className="space-y-2">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl">Game Settings</h2>
				<p className="text-muted-foreground">
					Configure the settings for your game
				</p>
			</div>

			<h3>Starting Score</h3>
			<div className="grid grid-cols-3 gap-2">
				<GameLengthCard
					value={101}
					label="Shorter"
					startingScore={startingScore}
					Icon={HourglassLowIcon}
				/>

				<GameLengthCard
					value={301}
					label="Medium"
					startingScore={startingScore}
					Icon={HourglassMediumIcon}
				/>

				<GameLengthCard
					value={501}
					label="Longer"
					startingScore={startingScore}
					Icon={HourglassHighIcon}
				/>

				<Popover>
					<PopoverTrigger>
						<Card
							className={clsx("cursor-pointer", {
								"outline-primary outline bg-primary/10":
									startingScore !== 501 &&
									startingScore !== 301 &&
									startingScore !== 101
							})}
						>
							<CardContent className="mx-auto">
								<ClockCountdownIcon className="size-14" />
							</CardContent>

							<CardFooter className="justify-center">
									Custom
									{startingScore === 501 ||
									startingScore === 301 ||
									startingScore === 101
										? null
										: ` - ${startingScore}`}</CardFooter>
						</Card>
					</PopoverTrigger>
					<PopoverContent className="space-y-2">
						<p>Starting Score Value</p>
						<Input
							value={customScore}
							onChange={(e) => setCustomScore(Number(e.target.value))}
							type="number"
							onFocus={(e) => e.target.select()}
						/>
						<Button
							variant={"outline"}
							onClick={() => initGameScore(customScore)}
						>
							Set Score
						</Button>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}

function GameLengthCard({
	value,
	label,
	startingScore,
	Icon
}: {
	value: number;
	label: string;
	startingScore: number;
	Icon: ForwardRefExoticComponent<IconProps>;
}) {
	const initGameScore = useGameStore((state) => state.initGameScore);

	return (
		<Card
			className={clsx("cursor-pointer", {
				"outline-primary outline bg-primary/10": startingScore === value
			})}
			onClick={() => initGameScore(value)}
		>
			<CardContent className="mx-auto">
				<Icon className="size-12" />
			</CardContent>
			<CardFooter className="justify-center">
				{label} - {value}
			</CardFooter>
		</Card>
	);
}
