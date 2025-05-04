export interface Dart {
  place: number;
  multiplier: 1 | 2 | 3
  type: "hit" | "miss";
}

export interface Round {
  dart1: Dart;
  dart2: Dart;
  dart3: Dart;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  score: number;
  rounds: Round[]
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
  updatePlayerColor: (playerId: string, color: string) => void;
  removePlayer: (playerId: string) => void;
  setCurrentPlayer: (playerId: string) => void;

  initGameScore: (score: number) => void;
  startGame: () => void;
  updateOrder: (newOrder: string[]) => void;
  addRound: (playerId: string, round: Round) => void;

  endGame: () => void;
}

export type GameStore = GameState & GameActions;