"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import useGameStore from "@/stores/game-store";
import { PenIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";

export default function AddPlayers() {
	const players = useGameStore((state) => state.players);
	const addPlayer = useGameStore((state) => state.addPlayer);
	const updatePlayerName = useGameStore((state) => state.updatePlayerName);
	const removePlayer = useGameStore((state) => state.removePlayer);

	return (
		<div className="space-y-2">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl">Add Players</h2>
				<p className="text-muted-foreground">
					Add players to the game, and give them a memorable name!
				</p>
			</div>

			<div className="grid grid-cols-3 gap-2">
				{players.map((player) => (
					<Card key={player.id}>
						<CardHeader>
							<CardTitle>{player.name}</CardTitle>
						</CardHeader>

						<CardContent className="flex flex-col gap-2 items-center" />

						<CardFooter className="flex flex-row items-center justify-center gap-2">
							<Popover>
								<PopoverTrigger render={<Button variant={"outline"} />}>
									<PenIcon /> Name
								</PopoverTrigger>
								<PopoverContent className="space-y-2">
									<p>Player Name</p>
									<Input
										value={player.name}
										onChange={(e) =>
											updatePlayerName(player.id, e.target.value)
										}
										onFocus={(e) => e.target.select()}
									/>
								</PopoverContent>
							</Popover>

							<Button
								variant={"destructive"}
								onClick={() => removePlayer(player.id)}
							>
								<TrashIcon /> Remove
							</Button>
						</CardFooter>
					</Card>
				))}

				<Card
					className="cursor-pointer focus-visible:ring-ring focus-visible:ring-[3px] outline-none transition-all"
					onClick={() => addPlayer(`Player ${players.length + 1}`)}
					onKeyDown={(e) =>
						e.key === "Enter" ? addPlayer(`Player ${players.length + 1}`) : null
					}
					tabIndex={0}
					aria-roledescription="button"
				>
					<CardContent className="mx-auto">
						<PlusIcon className="size-12" />
					</CardContent>
					<CardFooter className="justify-center">Add Player</CardFooter>
				</Card>
			</div>
		</div>
	);
}
