"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { randomColor } from "@/lib/utils";
import useGameStore from "@/stores/game-store";
import { Check, Edit, Palette, Plus, RefreshCcw, Trash } from "lucide-react";

export default function AddPlayers() {
	const players = useGameStore((state) => state.players);
	const addPlayer = useGameStore((state) => state.addPlayer);
	const updatePlayerName = useGameStore((state) => state.updatePlayerName);
	const updatePlayerColor = useGameStore((state) => state.updatePlayerColor);
	const removePlayer = useGameStore((state) => state.removePlayer);

	return (
		<div className="space-y-2">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl">Add Players</h2>
				<p className="text-muted-foreground">
					Add players to the game, and give them a name if you wish.
				</p>
			</div>

			<div className="grid grid-cols-3 gap-2">
				{players.map((player) => (
					<Card
						key={player.id}
						className="border"
						style={{ borderColor: player.color }}
					>
						<CardHeader>
							<h3>{player.name}</h3>
						</CardHeader>

						<CardContent className="flex flex-col gap-2 items-center" />

						<CardFooter className="flex flex-row items-center justify-center gap-2 w-full">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										size={"icon"}
									>
										<Edit />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="space-y-2">
									<p>Player Name</p>
									<Input
										value={player.name}
										onChange={(e) =>
											updatePlayerName(player.id, e.target.value)
										}
									/>
								</PopoverContent>
							</Popover>

							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										size={"icon"}
									>
										<Palette />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="space-y-2">
									<p>Player Color</p>
									<div className="flex flex-row items-center gap-2">
										<Button
											variant={"outline"}
											size={"icon"}
											onClick={() =>
												updatePlayerColor(player.id, randomColor())
											}
										>
											<RefreshCcw />
										</Button>
										<Input
											value={player.color}
											onChange={(e) =>
												updatePlayerColor(player.id, e.target.value)
											}
										/>
									</div>
									<ColorOptions
										updatePlayerColor={updatePlayerColor}
										playerId={player.id}
										currentColor={player.color}
									/>
								</PopoverContent>
							</Popover>

							<Button
								variant={"destructive"}
								size={"icon"}
								onClick={() => removePlayer(player.id)}
							>
								<Trash />
							</Button>
						</CardFooter>
					</Card>
				))}

				<Card
					className="cursor-pointer"
					onClick={() => addPlayer(`Player ${players.length + 1}`)}
				>
					<CardContent className="flex flex-col gap-2 items-center">
						<Plus className="size-14" />
						<p>Add Player</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function ColorOptions({
	updatePlayerColor,
	playerId,
	currentColor
}: {
	updatePlayerColor: (playerId: string, color: string) => void;
	playerId: string;
	currentColor: string;
}) {
	const colors = [
		// Top row
		"#FF0000",
		"#FFA500",
		"#FFFF00",
		"#90EE90",
		"#008000",
		"#00FFFF",
		"#ADD8E6",
		"#0000FF",

		// Bottom row
		"#800080",
		"#EE82EE",
		"#FFC0CB",
		"#A52A2A",
		"#4682B4",
		"#CD853F",
		"#DDA0DD",
		"#F08080"
	];

	return (
		<div className="flex flex-row gap-2 flex-wrap">
			{colors.map((color) => (
				<div
					key={color}
					className="w-6 h-6 rounded-md cursor-pointer flex items-center justify-center"
					style={{ backgroundColor: color }}
					onClick={() => updatePlayerColor(playerId, color)}
					onKeyDown={() => updatePlayerColor(playerId, color)}
				>
					{currentColor.toLowerCase() === color.toLowerCase() && (
						<Check className="size-4 text-background" />
					)}
				</div>
			))}
		</div>
	);
}
