import { useEffect, useState } from "react";
import PlayerScore from "../../components/PlayerScore/PlayerScore";
import { useGameProvider } from "../../context/GameContext";
import "./scoreBoardStyles.css";
import { Player } from "../../context/types";

const ScoreBoard = () => {
  const { game } = useGameProvider();
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

  return (
    <div className="container">
      <h1>ScoreBoard</h1>
      {scores?.map((player) => (
        <div>
          <p>{player.name}</p>
          <p>{player.score}</p>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
