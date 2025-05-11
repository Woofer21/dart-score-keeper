import PlayerList from "./_components/player-list";
import Spaces from "./_components/spaces";

export default function GamePage() {
	return (
		<main className="flex flex-col items-center justify-center gap-4 p-4">
			<h1 className="text-4xl">Game</h1>

			<div className="grid grid-cols-2 gap-2">
				<Spaces />

				<PlayerList />
			</div>
		</main>
	);
}

