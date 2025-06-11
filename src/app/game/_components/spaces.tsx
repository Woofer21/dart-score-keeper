"use client";

import { Button } from "@/components/ui/button";
import useGameStore from "@/stores/game-store";
import { Ban, CornerDownRight, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const points = new Array(20).fill(0);

type Round = {
	dart: number;
	totalScore: number;
	scores: { score: number; multiplier: 1 | 2 | 3 }[];
};

export default function Spaces() {
	const router = useRouter();
	const currentPlayer = useGameStore(
		(state) =>
			state.players.filter((player) => player.id === state.currentPlayer)[0]
	);
	const order = useGameStore((state) => state.order);
	const gameState = useGameStore((state) => state);
	const addRound = useGameStore((state) => state.addRound);
	const setNextPlayer = useGameStore((state) => state.setNextPlayer);
	const updateOrder = useGameStore((state) => state.updateOrder);

	const [isRedirecting, setIsRedirecting] = useState(false);
	const [selected, setSelected] = useState<number>(-1);
	const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);
	const [round, setRound] = useState<Round>({
		dart: 1,
		totalScore: 0,
		scores: []
	});

	console.log(gameState);
	

	const enterRound = useCallback(() => {
		const newScores = [...round.scores, { score: selected, multiplier }];
		const newTotalScore = round.totalScore + selected * multiplier;

		if (currentPlayer.score - newTotalScore === 0) {
			addRound(currentPlayer.id, {
				dart1: newScores[0],
				dart2: newScores[1] ?? { score: 0, multiplier: 1 },
				dart3: newScores[2] ?? { score: 0, multiplier: 1 },
				totalScore: newTotalScore,
				bust: false
			});

			console.log(order, currentPlayer.id);
			

			setNextPlayer();
			updateOrder([...order].filter((id) => id !== currentPlayer.id));

			// Reset round state
			setRound({
				dart: 1,
				totalScore: 0,
				scores: []
			});
		} else if (currentPlayer.score - newTotalScore < 0) {
			addRound(currentPlayer.id, {
				dart1: newScores[0],
				dart2: newScores[1] ?? { score: 0, multiplier: 1 },
				dart3: newScores[2] ?? { score: 0, multiplier: 1 },
				totalScore: newTotalScore,
				bust: currentPlayer.score - newTotalScore < 0
			});
			setNextPlayer();

			// Reset round state
			setRound({
				dart: 1,
				totalScore: 0,
				scores: []
			});
		} else if (round.dart === 3) {
			// Update store first
			addRound(currentPlayer.id, {
				dart1: newScores[0],
				dart2: newScores[1],
				dart3: newScores[2],
				totalScore: newTotalScore,
				bust: currentPlayer.score - newTotalScore < 0
			});
			setNextPlayer();

			// Reset round state
			setRound({
				dart: 1,
				totalScore: 0,
				scores: []
			});
		} else {
			// Not last dart, just update round state
			setRound((prev) => ({
				dart: prev.dart + 1,
				totalScore: prev.totalScore + selected * multiplier,
				scores: [...prev.scores, { score: selected, multiplier }]
			}));
		}

		// Reset selection and multiplier
		setSelected(-1);
		setMultiplier(1);
	}, [currentPlayer, order, round, selected, multiplier, addRound, setNextPlayer, updateOrder]);

	const handleEnterPress = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Enter" && selected !== -1) {
				enterRound();
			}
		},
		[enterRound, selected]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleEnterPress);

		return () => {
			document.removeEventListener("keydown", handleEnterPress);
		};
	}, [handleEnterPress]);

	useEffect(() => {
		if (!currentPlayer && !isRedirecting) {
			setIsRedirecting(true);
			router.push("/start");
		}
	}, [currentPlayer, router, isRedirecting]);

	if (!currentPlayer || isRedirecting) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4 justify-between rounded-md w-full h-full border border-border p-4 ">
			<div className="space-y-2">
				<div className="w-full bg-card p-4 rounded-md border border-border grid gird-cols-3 gap-2">
					<div>
						<p>Dart 1:</p>
						<div className="flex items-baseline gap-2">
							<p className="text-2xl font-bold">
								{round.dart === 1
									? selected === -1
										? "-"
										: selected * multiplier
									: round.scores[0]
										? round.scores[0].score * round.scores[0].multiplier
										: "-"}
							</p>
							<p className="text-sm text-muted-foreground">
								{round.dart === 1
									? selected === -1
										? "-"
										: selected
									: round.scores[0]
										? round.scores[0].score
										: "-"}
								{round.dart === 1
									? multiplier === 1
										? ""
										: `x${multiplier}`
									: round.scores[0]
										? round.scores[0].multiplier === 1
											? ""
											: `x${round.scores[0].multiplier}`
										: ""}
							</p>
						</div>
					</div>

					<div>
						<p>Dart 2:</p>
						<div className="flex items-baseline gap-2">
							<p className="text-2xl font-bold">
								{round.dart === 2
									? selected === -1
										? "-"
										: selected * multiplier
									: round.scores[1]
										? round.scores[1].score * round.scores[1].multiplier
										: "-"}
							</p>
							<p className="text-sm text-muted-foreground">
								{round.dart === 2
									? selected === -1
										? "-"
										: selected
									: round.scores[1]
										? round.scores[1].score
										: "-"}
								{round.dart === 2
									? multiplier === 1
										? ""
										: `x${multiplier}`
									: round.scores[1]
										? round.scores[1].multiplier === 1
											? ""
											: `x${round.scores[1].multiplier}`
										: ""}
							</p>
						</div>
					</div>

					<div>
						<p>Dart 3:</p>
						<div className="flex items-baseline gap-2">
							<p className="text-2xl font-bold">
								{round.dart === 3
									? selected === -1
										? "-"
										: selected * multiplier
									: round.scores[2]
										? round.scores[2].score * round.scores[2].multiplier
										: "-"}
							</p>
							<p className="text-sm text-muted-foreground">
								{round.dart === 3
									? selected === -1
										? "-"
										: selected
									: round.scores[2]
										? round.scores[2].score
										: "-"}
								{round.dart === 3
									? multiplier === 1
										? ""
										: `x${multiplier}`
									: round.scores[2]
										? round.scores[2].multiplier === 1
											? ""
											: `x${round.scores[2].multiplier}`
										: ""}
							</p>
						</div>
					</div>

					<div className="grid col-span-3 grid-cols-2 gap-2">
						<div>
							<p>Round Score:</p>
							<p className="text-2xl font-bold">
								{round.totalScore +
									(selected === -1 ? 0 : selected * multiplier)}
							</p>
						</div>

						<div>
							<p>Remaining Score:</p>
							<p className="text-2xl font-bold">
								{currentPlayer.score -
									round.totalScore -
									(selected === -1 ? 0 : selected * multiplier)}
							</p>
						</div>
					</div>
				</div>

				<div className="space-y-2 grow">
					<div className="grid grid-cols-2 gap-2">
						<Button
							variant={multiplier === 2 ? "default" : "outline"}
							onClick={() => setMultiplier((prev) => (prev === 2 ? 1 : 2))}
							className="w-full text-xl py-8"
							disabled={
								selected === -1 ||
								selected === 0 ||
								selected === 25 ||
								selected === 50
							}
						>
							Double
						</Button>
						<Button
							variant={multiplier === 3 ? "default" : "outline"}
							onClick={() => setMultiplier((prev) => (prev === 3 ? 1 : 3))}
							className="w-full text-xl py-8"
							disabled={
								selected === -1 ||
								selected === 0 ||
								selected === 25 ||
								selected === 50
							}
						>
							Triple
						</Button>
					</div>

					<div className="grid grid-cols-4 gap-2">
						<ScoreButton
							score={0}
							selected={selected}
							onClick={() => setSelected(0)}
						/>
						{points.map((_, i) => (
							<ScoreButton
								key={`point-${i + 1}`}
								score={i + 1}
								selected={selected}
								onClick={() => setSelected(i + 1)}
							/>
						))}
						<ScoreButton
							score={25}
							selected={selected}
							onClick={() => setSelected(25)}
						/>
						<ScoreButton
							score={50}
							selected={selected}
							onClick={() => setSelected(50)}
						/>
						<Button
							className="py-8"
							disabled={selected === -1}
							onClick={enterRound}
						>
							<CornerDownRight />
						</Button>
					</div>
				</div>
			</div>

			<div>
				<Button
					className="w-full py-8 flex items-center"
					variant={"outline"}
				>
					<Target /> Show Dartboard
				</Button>
			</div>
		</div>
	);
}

function ScoreButton({
	score,
	selected,
	...props
}: { score: number; selected: number } & React.ComponentProps<typeof Button>) {
	return (
		<Button
			variant={selected === score ? "default" : "outline"}
			className="text-xl py-8"
			{...props}
		>
			<p>{score === 0 ? <Ban /> : score}</p>
		</Button>
	);
}
