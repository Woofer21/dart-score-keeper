import { create } from "zustand";
import type { GameState, GameStore, Round } from "@/types/gameTypes";
import { v4 as uuid } from "uuid";
import { randomColor } from "@/lib/utils";

const initialState: GameState = {
	players: [],
	currentPlayer: null,
	order: [],
	startingScore: 301,
	startTime: null,
	endTime: null
};

const useGameStore = create<GameStore>((set) => ({
	...initialState,

	addPlayer: (name: string) =>
		set((state) => ({
			players: [
				...state.players,
				{ id: uuid(), name, score: 301, rounds: [], color: randomColor() }
			]
		})),
	updatePlayerName: (playerId: string, name: string) =>
		set((state) => ({
			players: state.players.map((player) =>
				player.id === playerId ? { ...player, name } : player
			)
		})),
	updatePlayerColor: (playerId: string, color: string) =>
		set((state) => ({
			players: state.players.map((player) =>
				player.id === playerId ? { ...player, color } : player
			)
		})),
	removePlayer: (playerId: string) =>
		set((state) => ({
			players: state.players.filter((player) => player.id !== playerId)
		})),
	setCurrentPlayer: (playerId: string) =>
		set(() => ({ currentPlayer: playerId })),
	setNextPlayer: () => {
		set((state) => {
			const indx = state.order.indexOf(state.currentPlayer ?? "");

			if (indx === -1) {
				return { currentPlayer: null };
			}

			return {
				currentPlayer:
					state.order[indx + 1 === state.order.length ? 0 : indx + 1]
			};
		});
	},

	initGameScore: (score: number) =>
		set((state) => ({
			players: state.players.map((player) => ({ ...player, score })),
			startingScore: score
		})),
	startGame: () =>
		set((state) => ({
			startTime: new Date(),
			currentPlayer: state.players[0].id,
			order: [...state.players.map((player) => player.id)]
		})),
	updateOrder: (newOrder: string[]) => set((state) => ({ order: newOrder })),
	addRound: (playerId: string, round: Round) =>
		set((state) => ({
			players: state.players.map((player) =>
				player.id === playerId
					? {
							...player,
							score: round.bust
								? player.score
								: player.score - round.totalScore,
							rounds: [...player.rounds, round]
						}
					: player
			)
		})),

	endGame: () => set(() => ({ ...initialState }))
}));

export default useGameStore;
