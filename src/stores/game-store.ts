import { create } from "zustand";
import { GameState, GameStore, Round } from "@/types/gameTypes";
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
					? { ...player, rounds: [...player.rounds, round] }
					: player
			)
		})),

	endGame: () => set(() => ({ ...initialState }))
}));

export default useGameStore;
