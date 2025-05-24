"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useGameStore from "@/stores/game-store";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlayerList() {
	const router = useRouter();
	const players = useGameStore((state) => state.players);

	if (players.length === 0) router.push("/start");

	return (
		<div className="flex flex-col gap-2 w-full h-full rounded-md border border-border p-4">
			{players.map((player) => (
				<div className="bg-card rounded-md p-4 flex flex-row gap-2 items-center border border-border justify-between">
					<div>
						<p>{player.name}</p>
						<div>
							<h2 className="text-3xl font-bold">{player.score}</h2>
						</div>
					</div>
					<div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size={"icon"} variant={"outline"}>
									<History />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Show Dart History</TooltipContent>
						</Tooltip>
					</div>
				</div>
			))}
		</div>
	);
}

