"use client";

import { defineStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import useGameStore from "@/stores/game-store";
import { useRouter } from "next/navigation";
import AddPlayers from "./_components/add-players";
import GameSettings from "./_components/game-settings";
import StartGame from "./_components/start";

const { Stepper } = defineStepper(
	{ id: "step-1", name: "Set Players" },
	{ id: "step-2", name: "Game Settings" },
	{ id: "step-3", name: "Review & Start Game" }
);

export default function StartPage() {
	const router = useRouter();
	const state = useGameStore((state) => state);

	const startGame = () => {
		state.startGame();
		router.push("/game");
	};

	return (
		<main className="flex flex-col items-center justify-center gap-4 p-4">
			<h1 className="text-5xl">Start Game</h1>

			<div className="w-2xl">
				<Stepper.Provider className="space-y-4">
					{({ methods }) => (
						<>
							<Stepper.Navigation>
								{methods.all.map((step) => (
									<Stepper.Step
										of={step.id}
										key={step.id}
									>
										<Stepper.Title>{step.name}</Stepper.Title>
									</Stepper.Step>
								))}
							</Stepper.Navigation>

							{methods.switch({
								"step-1": (step) => <AddPlayers />,
								"step-2": (step) => <GameSettings />,
								"step-3": (step) => <StartGame methods={methods} />
							})}

							<Stepper.Controls>
								{!methods.isLast && (
									<Button
										variant="secondary"
										onClick={methods.prev}
										disabled={methods.isFirst}
									>
										Previous
									</Button>
								)}
								<Button
									onClick={methods.isLast ? startGame : methods.next}
									disabled={state.players.length === 0}
								>
									{methods.isLast ? "Start Game" : "Next"}
								</Button>
							</Stepper.Controls>
						</>
					)}
				</Stepper.Provider>
			</div>
		</main>
	);
}
