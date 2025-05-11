"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban } from "lucide-react";
import { useState } from "react";

const points = new Array(20).fill(0);

export default function Spaces() {
	const [selected, setSelected] = useState(-1);

	return (
		<div className="w-2xl grid grid-cols-3 gap-2">
			{points.map((_, i) => (
				<Card key={i} onClick={() => setSelected(i)}>
					<CardHeader>
						<CardTitle className="text-2xl text-center">{i + 1}</CardTitle>
					</CardHeader>

					{i === selected && (
						<CardContent className="flex flex-row gap-2 justify-between">
							<Button>2x</Button>
							<Button>3x</Button>
							<Button>
								<Ban />
							</Button>
						</CardContent>
					)}
				</Card>
			))}
		</div>
	);
}

