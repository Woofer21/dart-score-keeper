"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useGameStore from "@/stores/game-store";
import type { Player } from "@/types/gameTypes";
import { Crown, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlayerList() {
	const router = useRouter();
	const players = useGameStore((state) => state.players);
	const currentPlayer = useGameStore((state) => state.currentPlayer);
	const endGame = useGameStore((state) => state.endGame)

	const [bypass, setBypass] = useState(false);

	return (
		<div className="flex flex-col gap-2 justify-between w-full h-full rounded-md border border-border p-4">
			<div className="flex flex-col gap-2">
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

				<AlertDialog open={(players.filter((p) => p.score === 0).length > 0 && !bypass) || players.filter((p) => p.score !== 0).length === 0}>
					<AlertDialogContent size="sm">
						<AlertDialogHeader>
							<AlertDialogTitle>🎉 Congratulations {players.find((p) => p.score === 0)?.name}! 🎉</AlertDialogTitle>
							<AlertDialogDescription>You have won the game!</AlertDialogDescription>
						</AlertDialogHeader>

						<ScrollArea className="max-h-64">
							{players.sort((a, b) => a.score - b.score).map((player) => (
								<div key={`${player.id}-modal`} className="border border-border p-2 rounded-md my-2">
									<div className="flex flex-row items-center gap-2 justify-between">
										<h2>{player.name}</h2>
										<p>{player.score}</p>
									</div>

									<Button variant={"outline"} className="w-full my-2">Show Darts</Button>
								</div>
							))}
						</ScrollArea>

						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setBypass(true)} disabled={players.filter((p) => p.score !== 0).length === 0}>Continue Game</AlertDialogCancel>
							<AlertDialogAction onClick={endGame}>New Game</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				{bypass && <Button variant={"outline"} className="w-full" onClick={() => setBypass(false)}>End Game</Button>}
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
			className={cn(
				`bg-card rounded-md p-4 flex flex-row gap-2 items-center border border-border justify-between relative ${
					current ? "border-primary" : "scale-95"
				} ${player.score === 0 ? "border-yellow-500 shadow-lg shadow-yellow-500/50" : ""}`
			)}
			{...props}
		>
			{player.score === 0 && (
				<Crown className="text-yellow-500 absolute -top-2 -left-2 -rotate-24" />
			)}
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
