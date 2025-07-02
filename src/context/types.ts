export interface Game {
  rounds: Round[];
  numberOfRounds: number;
  roundNumber: number;
}

export interface Round {
  players: Player[];
}

export interface Player {
  name: string;
  score: number;
}

export const EmptyGame: Game = {
  rounds: [],
  roundNumber: 0,
  numberOfRounds: 10,
};

export enum Screen {
  Lobby,
  Game,
  ScoreBoard,
}
