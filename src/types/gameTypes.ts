export interface Dart {
	score: number;
	multiplier: 1 | 2 | 3;
}

export interface Round {
	dart1: Dart;
	dart2: Dart;
	dart3: Dart;
	totalScore: number;
	bust: boolean;
}

export interface Player {
	id: string;
	name: string;
	score: number;
	rounds: Round[];
}

export interface GameState {
	players: Player[];
	currentPlayer: string | null;
	order: string[];
	startingScore: number;
	startTime: Date | null;
	endTime: Date | null;
}

export interface GameActions {
	addPlayer: (name: string) => void;
	updatePlayerName: (playerId: string, name: string) => void;
	removePlayer: (playerId: string) => void;
	setCurrentPlayer: (playerId: string) => void;
	setNextPlayer: () => void;

	initGameScore: (score: number) => void;
	startGame: () => void;
	updateOrder: (newOrder: string[]) => void;
	addRound: (playerId: string, round: Round) => void;

	endGame: () => void;
}

export type GameStore = GameState & GameActions;
