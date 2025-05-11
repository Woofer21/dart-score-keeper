"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useGameStore from "@/stores/game-store";
import { useRouter } from "next/navigation";

export default function PlayerList() {
	const router = useRouter();
	const players = useGameStore((state) => state.players);

	if (players.length === 0) router.push("/start");

	return (
		<div className="flex flex-row gap-2">
			{players.map((player) => (
				<Card key={player.id} className="border w-40" style={{ borderColor: player.color }}>
					<CardHeader>
						<CardTitle>{player.name}</CardTitle>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}

