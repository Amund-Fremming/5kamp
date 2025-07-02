import { useEffect } from "react";
import PlayerScore from "../../components/PlayerScore/PlayerScore";
import { useGameProvider } from "../../context/GameContext";
import { Round, Screen } from "../../context/types";
import ActionButton from "../../components/ActionButton/ActionButton";
import "./gameStyles.css";
import haffeImage from "../../assets/haffe.png";
import theoImage from "../../assets/theo.png";

export const Game = () => {
  const { game, setGame, setScreen } = useGameProvider();

  useEffect(() => {}, [game]);

  const handleUpdateScore = (playerIndex: number, val: number) => {
    const updatedPlayers = game.rounds[game.roundNumber].players.map(
      (player, index) => {
        if (playerIndex === index) {
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

  const getPlayerSum = (nameToFind: string): number => {
    var sum = 0;
    console.log(game);
    for (var i = 0; i < game.roundNumber; i++) {
      for (var j = 0; j < game.rounds[i].players.length; j++) {
        if (game.rounds[i].players[j].name === nameToFind) {
          sum += game.rounds[i].players[j].score;
        }
      }
    }

    return sum;
  };

  return (
    <div className="container">
      <div className="image-wrapper">
        <img className="image" src={haffeImage} alt="haffe" />
        <img className="image" src={theoImage} alt="theo" />
      </div>
      <h1 className="header">Runde {game.roundNumber + 1}</h1>
      {game.rounds[game.roundNumber].players.map((player, index) => (
        <PlayerScore
          handleIncrement={() => handleUpdateScore(index, 1)}
          handleDecrement={() => handleUpdateScore(index, -1)}
          player={player}
          sum={getPlayerSum(player.name)}
        />
      ))}

      <div className="abs-buttons">
        {game.roundNumber < game.numberOfRounds - 1 && (
          <ActionButton onClick={handleNext} text="Neste" />
        )}
        {game.roundNumber === game.numberOfRounds - 1 && (
          <ActionButton onClick={handleFinished} text="Scoreboard" />
        )}
        {game.roundNumber > 0 && (
          <ActionButton onClick={handlePrev} text="Forrige" />
        )}
      </div>
    </div>
  );
};

export default Game;
