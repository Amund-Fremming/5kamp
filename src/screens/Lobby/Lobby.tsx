import { useState } from "react";
import { useGameProvider } from "../../context/GameContext";
import { Player, Round, Screen } from "../../context/types";
import "./lobbyStyles.css";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";

const Lobby = () => {
  const [numRounds, setNumRounds] = useState<number>(5);
  const [error, setError] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);

  const { game, setGame, setScreen } = useGameProvider();

  const handleStartGame = () => {
    const rounds: Round[] = [];
    for (var i = 0; i < game.numberOfRounds; i++) {
      const round: Round = {
        players: players,
      };
      rounds.push(round);
    }

    setGame((prev) => ({
      ...prev,
      numberOfRounds: numRounds,
      rounds: rounds,
    }));
    setScreen(Screen.Game);
  };

  const handleAddPlayer = () => {
    const newPlayer: Player = {
      name: "",
      score: 0,
    };

    setPlayers((prev) => [...prev, newPlayer]);
  };

  const handleRemovePlayer = (indexToRemove: number) => {
    setPlayers((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSetName = (newName: string, playerIndex: number) => {
    const updatedPlayers = players.map((player, index) => {
      if (playerIndex === index) {
        return { ...player, name: newName };
      }

      return player;
    });

    setPlayers(updatedPlayers);
  };

  return (
    <div className="container">
      <h1>5-Kamp logger</h1>
      <p>{error}</p>
      <div className="rounds-wrapper">
        <label>Antall runder: {numRounds}</label>
        <div className="ronuds">
          <button
            onClick={() => setNumRounds((prev) => (prev === 0 ? 0 : prev - 1))}
          >
            -
          </button>
          <button
            onClick={() =>
              setNumRounds((prev) => (prev === 20 ? 20 : prev + 1))
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="players">
        {players.map((_, index) => (
          <PlayerInfo
            setName={handleSetName}
            removeName={() => handleRemovePlayer(index)}
            index={index}
          />
        ))}
      </div>
      <div className="add-players">
        <button onClick={handleAddPlayer}>Legg til spiller</button>
      </div>
      <div className="button-wrapper">
        <button onClick={handleStartGame}>Start</button>
      </div>
    </div>
  );
};

export default Lobby;
