import React, { createContext, ReactNode, useContext, useState } from "react";
import { EmptyGame, Game, Screen } from "./types";

interface IGameContext {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  screen: Screen;
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

const defaultContextValue: IGameContext = {
  game: EmptyGame,
  setGame: () => {},
  screen: Screen.Lobby,
  setScreen: () => {},
};

const GameContext = createContext<IGameContext>(defaultContextValue);

export const useGameProvider = () => useContext(GameContext);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<Game>(EmptyGame);
  const [screen, setScreen] = useState<Screen>(Screen.Lobby);

  const value = {
    game,
    setGame,
    screen,
    setScreen,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
