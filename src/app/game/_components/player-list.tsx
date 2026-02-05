"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useGameStore from "@/stores/game-store";
import type { Player } from "@/types/gameTypes";
import { ClockCounterClockwiseIcon, CrownIcon, FunnelIcon, SlidersIcon, SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function PlayerList() {
	const players = useGameStore((state) => state.players);
	const playersByScore = useGameStore((state) => state.playersByScore);
	const currentPlayer = useGameStore((state) => state.currentPlayer);
	const endGame = useGameStore((state) => state.endGame);

	const [bypass, setBypass] = useState(false);
	const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

	return (
		<div className="flex flex-col gap-2 justify-between w-full h-full rounded-md border border-border p-4">
			<div className="flex flex-col relative">
				<div className="absolute h-4 z-10 w-full top-0 left-0 bg-linear-to-b from-background to-transparent"/>

				<ScrollArea className="max-h-[85dvh]">
					<div className="h-2" />

					{players
						.filter((player) => player.id === currentPlayer)
						.map((player) => (
							<PlayerCard
								player={player}
								key={player.id}
								current
							/>
						))}

					<div className="flex justify-between items-baseline pr-1.5 mt-4">
						<p className="text-muted-foreground text-sm h-max">
						{sort === "default" ? "By Added Order" : sort === "asc" ? "By Score Ascending" : "By Score Descending"}
						</p>

						<DropdownMenu>
							<DropdownMenuTrigger render={<Button size="icon" variant="secondary"/>}>
						<FunnelIcon />

							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuGroup>
									<DropdownMenuLabel>Sort By</DropdownMenuLabel>

									<DropdownMenuSeparator />

								<DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
									<DropdownMenuRadioItem value={"default"}>
										<SlidersIcon /> Default
									</DropdownMenuRadioItem>

									<DropdownMenuRadioItem value={"asc"}>
										<SortAscendingIcon /> Score Ascending
									</DropdownMenuRadioItem>

									<DropdownMenuRadioItem value={"desc"}>
										<SortDescendingIcon /> Score Descending
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
									
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Separator className={"my-2"} />

					{[...sort === "default" ? players : sort === "asc" ? playersByScore : [...playersByScore].reverse()]
						.filter((player) => player.id !== currentPlayer)
						.map((player) => (
							<PlayerCard
								player={player}
								key={player.id}
							/>
						))}

						<div className="h-2"  />
				</ScrollArea>

				<div className="absolute h-4 w-full z-10 bottom-0 left-0 bg-linear-to-b from-transparent to-background"/>
			</div>

			<AlertDialog
				open={
					(players.filter((p) => p.score === 0).length > 0 && !bypass) ||
					players.filter((p) => p.score !== 0).length === 0
				}
			>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogTitle>
							🎉 Congratulations {players.find((p) => p.score === 0)?.name}! 🎉
						</AlertDialogTitle>
						<AlertDialogDescription>
							You have won the game!
						</AlertDialogDescription>
					</AlertDialogHeader>

					<ScrollArea className="max-h-64">
						{[...players]
							.sort((a, b) => a.score - b.score)
							.map((player) => (
								<div
									key={`${player.id}-modal`}
									className="border border-border p-2 rounded-md my-2"
								>
									<div className="flex flex-row items-center gap-2 justify-between">
										<h2>{player.name}</h2>
										<p>{player.score}</p>
									</div>

									<Button
										variant={"outline"}
										className="w-full my-2"
									>
										Show Darts
									</Button>
								</div>
							))}
					</ScrollArea>

					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => setBypass(true)}
							disabled={players.filter((p) => p.score !== 0).length === 0}
						>
							Continue Game
						</AlertDialogCancel>
						<AlertDialogAction onClick={endGame}>New Game</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{bypass && (
				<Button
					variant={"outline"}
					className="w-full"
					onClick={() => setBypass(false)}
				>
					End Game
				</Button>
			)}
			{!bypass && !(players.filter((p) => p.score === 0).length > 0) && (
				<AlertDialog>
					<AlertDialogTrigger render={<Button variant={"destructive"} />}>
						End Game Early
					</AlertDialogTrigger>
					<AlertDialogContent size="sm">
						<AlertDialogHeader>
							<AlertDialogTitle>End Game Early?</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to end the game early?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>No</AlertDialogCancel>
							<AlertDialogAction
								variant={"destructive"}
								onClick={endGame}
							>
								End Game
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}

const PlayerCard = ({
	player,
	current = false,
	...props
}: { player: Player; current?: boolean } & React.ComponentProps<"div">) => {
	const playersByScore = useGameStore((state) => state.playersByScore);

	const top3Ids = playersByScore.slice(0, 3).map((player) => player.id);
	const winner = player.score === 0

	return (
		<div
			key={player.id}
			className={cn(
				`bg-card rounded-md p-4 flex flex-row gap-2 items-center border border-border justify-between relative ${
					current ? "border-primary" : "scale-95"
				} ${winner ? "border-yellow-500 shadow-lg shadow-yellow-500/50" : ""}`
			)}
			{...props}
		>
			{winner && (
				<CrownIcon className="text-yellow-500 absolute -top-2 -left-2 -rotate-24 size-8" />
			)}
			{!current && !winner && top3Ids.indexOf(player.id) === 0 && (
				<p className="absolute -top-2 -left-2 -rotate-24 text-yellow-500 text-xl">#1</p>
			)}
			{!current && !winner && top3Ids.indexOf(player.id) === 1 && (
				<p className="absolute -top-2 -left-2 -rotate-24 text-gray-500 text-lg">#2</p>
			)}
			{!current && !winner && top3Ids.indexOf(player.id) === 2 && (
				<p className="absolute -top-2 -left-2 -rotate-24 text-amber-700">#3</p>
			)}
			<div>
				<p>{player.name}</p>
				<div>
					<h2 className="text-3xl font-bold">{player.score}</h2>
				</div>
			</div>
			<div>
				<Tooltip>
					<TooltipTrigger render={<Button
							size={"icon"}
							variant={"outline"} />}>
							<ClockCounterClockwiseIcon />
					</TooltipTrigger>
					<TooltipContent>Show Dart History</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
};
