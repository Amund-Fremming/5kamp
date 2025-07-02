import { useGameProvider } from "../../context/GameContext";
import { Screen } from "../../context/types";
import Game from "../Game/Game";
import Lobby from "../Lobby/Lobby";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

const Router = () => {
  const { screen } = useGameProvider();

  switch (screen) {
    case Screen.Lobby:
      return <Lobby />;
    case Screen.Game:
      return <Game />;
    case Screen.ScoreBoard:
      return <ScoreBoard />;
    default:
      return (
        <div>
          <h1>Noe gikk galt</h1>
        </div>
      );
  }
};

export default Router;
