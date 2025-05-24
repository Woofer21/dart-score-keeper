"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/components/ui/tooltip";
import useGameStore from "@/stores/game-store";
import type { Player } from "@/types/gameTypes";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlayerList() {
	const router = useRouter();
	const players = useGameStore((state) => state.players);
	const currentPlayer = useGameStore((state) => state.currentPlayer);

	return (
		<div className="flex flex-col gap-2 w-full h-full rounded-md border border-border p-4">
			{players
				.filter((player) => player.id === currentPlayer)
				.map((player) => (
					<PlayerCard
						player={player}
						key={player.id}
						current
					/>
				))}
			{players
				.filter((player) => player.id !== currentPlayer)
				.map((player) => (
					<PlayerCard
						player={player}
						key={player.id}
					/>
				))}
		</div>
	);
}

const PlayerCard = ({
	player,
	current = false,
	...props
}: { player: Player; current?: boolean } & React.ComponentProps<"div">) => {
	return (
		<div
			key={player.id}
			className={`bg-card rounded-md p-4 flex flex-row gap-2 items-center border border-border justify-between ${
				current ? "border-primary" : "scale-95"
			}`}
			{...props}
		>
			<div>
				<p>{player.name}</p>
				<div>
					<h2 className="text-3xl font-bold">{player.score}</h2>
				</div>
			</div>
			<div>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size={"icon"}
							variant={"outline"}
						>
							<History />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Show Dart History</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
};
