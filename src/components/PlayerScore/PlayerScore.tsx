import "./playerScoreStyles.css";
import { Player } from "../../context/types";

interface PlayerScoreProps {
  player: Player;
  finished: boolean;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export const PlayerScore = (props: PlayerScoreProps) => {
  return (
    <div className="container">
      <p>{props.player.name}</p>
      <p>{props.player.score}</p>
      {!props.finished && (
        <div>
          <button onClick={props.handleDecrement}>-</button>
          <button onClick={props.handleIncrement}>+</button>
        </div>
      )}
    </div>
  );
};

export default PlayerScore;
