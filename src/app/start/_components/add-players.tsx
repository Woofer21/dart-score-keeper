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
					Add players to the game, and give them a name if you wish.
				</p>
			</div>

			<div className="grid grid-cols-3 gap-2">
				{players.map((player) => (
					<Card key={player.id}>
						<CardHeader>
							<h3>{player.name}</h3>
						</CardHeader>

						<CardContent className="flex flex-col gap-2 items-center" />

						<CardFooter className="flex flex-row items-center justify-center gap-2 w-full">
							<Popover>
								<PopoverTrigger render={<Button
										variant={"outline"}
										size={"icon"}
									/>}>
									
										<PenIcon />
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

							<Button
								variant={"destructive"}
								size={"icon"}
								onClick={() => removePlayer(player.id)}
							>
								<TrashIcon />
							</Button>
						</CardFooter>
					</Card>
				))}

				<Card
					className="cursor-pointer"
					onClick={() => addPlayer(`Player ${players.length + 1}`)}
				>
					<CardContent className="flex flex-col gap-2 items-center">
						<PlusIcon className="size-14" />
						<p>Add Player</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
