import { useEffect } from "react";
import PlayerScore from "../../components/PlayerScore/PlayerScore";
import { useGameProvider } from "../../context/GameContext";
import { Round, Screen } from "../../context/types";

export const Game = () => {
  const { game, setGame, setScreen } = useGameProvider();

  useEffect(() => {
    // trigger?
    console.log("TRIOGGERED");
    console.log("Nr", game.roundNumber);
  }, [game]);

  const handleUpdateScore = (playerIndex: number, val: number) => {
    const updatedPlayers = game.rounds[game.roundNumber].players.map(
      (player, index) => {
        if (playerIndex == index) {
          return { ...player, score: player.score + val };
        }

        return player;
      }
    );

    const updatedRounds: Round[] = game.rounds.map((round, index) => {
      if (index === game.roundNumber) {
        return { ...round, players: updatedPlayers };
      }
      return round;
    });

    setGame((prev) => ({
      ...prev,
      rounds: updatedRounds,
    }));
  };

  const handleNext = () => {
    if (game.roundNumber === game.numberOfRounds - 1) {
      return;
    }

    setGame((prev) => ({
      ...prev,
      roundNumber: prev.roundNumber + 1,
    }));
  };

  const handlePrev = () => {
    if (game.roundNumber === 0) {
      return;
    }

    setGame((prev) => ({
      ...prev,
      roundNumber: prev.roundNumber - 1,
    }));
  };

  const handleFinished = () => {
    if (game.roundNumber !== game.numberOfRounds - 1) {
      return;
    }

    setScreen(Screen.ScoreBoard);
  };

  return (
    <div className="container">
      <h1>Runde {game.roundNumber + 1}</h1>
      <div className="players-scores">
        {game.rounds[game.roundNumber].players.map((player, index) => (
          <PlayerScore
            handleIncrement={() => handleUpdateScore(index, 1)}
            handleDecrement={() => handleUpdateScore(index, -1)}
            player={player}
            finished={false}
          />
        ))}
      </div>

      <div className="next">
        {game.roundNumber > 0 && <button onClick={handlePrev}>Forrige</button>}
        {game.roundNumber < game.numberOfRounds - 1 && (
          <button onClick={handleNext}>Neste</button>
        )}
        {game.roundNumber === game.numberOfRounds - 1 && (
          <button onClick={handleFinished}>Regn ut</button>
        )}
      </div>
    </div>
  );
};

export default Game;
