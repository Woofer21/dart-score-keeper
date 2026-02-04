"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useGameStore from "@/stores/game-store";
import { PencilIcon } from "@phosphor-icons/react";
import type { Stepper } from "@stepperize/react";

export type StepperMethods = Stepper<
	[
		{ readonly id: "step-1"; readonly name: "Set Players" },
		{ readonly id: "step-2"; readonly name: "Game Settings" },
		{ readonly id: "step-3"; readonly name: "Review & Start Game" }
	]
>;

export default function StartGame({ methods }: { methods: StepperMethods }) {
	const state = useGameStore((state) => state);

	return (
		<div className="space-y-2">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl">Review & Start Game</h2>
				<p className="text-muted-foreground">
					All the settings look good? Start the game!
				</p>
			</div>

			<div className="space-y-2">
				<GameStateWrapper>
						<div>
							{state.players.length} Players <br />
							<span className="text-muted-foreground group-data-[state=open]:hidden">
								{state.players.map((player) => player.name).join(", ")}
							</span>
						</div>
						<EditTooltip text="Edit Players" step="step-1" methods={methods} />
				</GameStateWrapper>
<GameStateWrapper>
						<div>
							Game Settings <br />
							<span className="text-muted-foreground">
								Score - {state.startingScore}
							</span>
						</div>
						<EditTooltip text="Edit Game Settings" step="step-2" methods={methods} />
	</GameStateWrapper>
			</div>
		</div>
	);
}

function GameStateWrapper({ children }: { children: React.ReactNode }) {
	return (
							<div className="bg-card rounded-md border border-border w-full p-3 text-left flex flex-row items-center justify-between gap-2 group">

								{children}
							</div>
	)
}

function EditTooltip({ text, step, methods }: { text: string, step: "step-1" | "step-2", methods: StepperMethods }) {
	return (

						<Tooltip>
							<TooltipTrigger render={<Button 
							onClick={() => methods.goTo(step)}
							onKeyDown={() => methods.goTo(step)} variant={"ghost"} size={"icon"} />}>
							<PencilIcon className="size-6" />
							</TooltipTrigger>
							<TooltipContent>
								{text}
							</TooltipContent>
						</Tooltip>
	)
}