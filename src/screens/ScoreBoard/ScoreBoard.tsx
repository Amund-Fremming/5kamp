import { useEffect, useState } from "react";
import { useGameProvider } from "../../context/GameContext";
import "./scoreBoardStyles.css";
import { EmptyGame, Player, Screen } from "../../context/types";
import ActionButton from "../../components/ActionButton/ActionButton";
import haffeImage from "../../assets/haffe.png";
import theoImage from "../../assets/theo.png";

const ScoreBoard = () => {
  const { game, setGame, setScreen } = useGameProvider();
  const [scores, setScores] = useState<Player[]>();

  useEffect(() => {
    calculateScoreBoard();
  }, []);

  const calculateScoreBoard = () => {
    const scoreMap = new Map<string, number>();
    for (var i = 0; i < game.rounds.length; i++) {
      for (var j = 0; j < game.rounds[i].players.length; j++) {
        const name = game.rounds[i].players[j].name;
        const roundScore = game.rounds[i].players[j].score;
        const prevScore = scoreMap.get(name) ?? 0;
        scoreMap.set(name, prevScore + roundScore);
      }
    }

    const scoreArray: Player[] = Array.from(scoreMap.entries()).map(
      ([name, score]) => ({ name, score })
    );

    setScores(scoreArray);
  };

  const handleLobbyPressed = () => {
    setScreen(Screen.Lobby);
    setGame(EmptyGame);
  };

  return (
    <div className="container">
      <div className="image-wrapper">
        <img className="image" src={haffeImage} alt="haffe" />
        <img className="image" src={theoImage} alt="theo" />
      </div>
      <h1 className="header">ScoreBoard</h1>
      {scores
        ?.sort((a, b) => b.score - a.score)
        ?.map((player, index) => (
          <div className="scoreboard__wrapper">
            <p>
              {index + 1}. {player.name}
            </p>
            <p>{player.score}</p>
          </div>
        ))}

      <div className="space" />

      <ActionButton onClick={handleLobbyPressed} text="Lobby" />
      <ActionButton
        onClick={() => setScreen(Screen.Game)}
        text="Rediger spill"
      />
    </div>
  );
};

export default ScoreBoard;
