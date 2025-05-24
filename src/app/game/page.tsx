import PlayerList from "./_components/player-list";
import Spaces from "./_components/spaces";

export default function GamePage() {
	return (
		<main className="flex-1 container p-6 m-auto">
			<div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-2 w-full min-h-[85vh]">
				<Spaces />

				<PlayerList />
			</div>
		</main>
	);
}
