import "./playerScoreStyles.css";
import { Player } from "../../context/types";
import { useEffect } from "react";
import { useGameProvider } from "../../context/GameContext";

interface PlayerScoreProps {
  player: Player;
  sum: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export const PlayerScore = ({
  handleDecrement,
  handleIncrement,
  player,
  sum,
}: PlayerScoreProps) => {
  return (
    <div className="playerscore__container">
      <div className="playerscore__wrapper">
        <p className="playerscore__p">{player.name}</p>
        <p className="playerscore__p">({sum})</p>
      </div>
      <div className="playerscore__wrapper">
        <p className="playerscore__p">{player.score}</p>
        <button className="playerscore__button" onClick={handleDecrement}>
          -
        </button>
        <button className="playerscore__button" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default PlayerScore;
