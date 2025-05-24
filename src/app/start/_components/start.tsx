"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import useGameStore from "@/stores/game-store";
import type { Stepper } from "@stepperize/react";
import { ChevronDown, Edit } from "lucide-react";

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
				<p className="text-muted-foreground">All the settings look good? Start the game!</p>
			</div>

			<div className="space-y-2">
				<Collapsible className="bg-card rounded-md border border-border ">
					<CollapsibleTrigger className="w-full p-3 text-left flex flex-row items-center justify-between gap-2 group cursor-pointer">
						<div>
							{state.players.length} Players <br />
							<span className="text-muted-foreground group-data-[state=open]:hidden">
								{state.players.map((player) => player.name).join(", ")}
							</span>
						</div>
						<div className="flex flex-row items-center gap-2">
							<div
								className="p-2 rounded-md hover:bg-muted/50 transition-all cursor-pointer"
								onClick={() => methods.goTo("step-1")}
								onKeyDown={() => methods.goTo("step-1")}
							>
								<Edit className="size-6" />
							</div>
							<ChevronDown className="size-8 group-data-[state=open]:rotate-180 transition-all" />
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-row gap-2 p-2">
						{state.players.map((player) => (
							<Card className="px-3" key={player.id}>
								<CardTitle>{player.name}</CardTitle>
							</Card>
						))}
					</CollapsibleContent>
				</Collapsible>

				<Collapsible className="bg-card rounded-md border border-border">
					<CollapsibleTrigger className="w-full p-3 text-left flex flex-row items-center justify-between gap-2 group">
						<div>
							Game Settings <br />
							<span className="text-muted-foreground">Score - {state.startingScore},</span>
						</div>
						<div
							className="p-2 rounded-md hover:bg-muted/50 transition-all cursor-pointer"
							onClick={() => methods.goTo("step-2")}
							onKeyDown={() => methods.goTo("step-2")}
						>
							<Edit className="size-6" />
						</div>
					</CollapsibleTrigger>
				</Collapsible>
			</div>
		</div>
	);
}

