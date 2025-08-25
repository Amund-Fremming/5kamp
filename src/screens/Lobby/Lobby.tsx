import { useState } from "react";
import { useGameProvider } from "../../context/GameContext";
import { Player, Round, Screen } from "../../context/types";
import "./lobbyStyles.css";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";
import haffeImage from "../../assets/haffe.png";
import theoImage from "../../assets/theo.png";

const Lobby = () => {
  const [numRounds, setNumRounds] = useState<number>(5);
  const [error, setError] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);

  const { game, setGame, setScreen } = useGameProvider();

  const handleStartGame = () => {
    const filteredPlayers = players.filter(
      (player) => player.name !== undefined && player.name !== ""
    );

    if (filteredPlayers.length < 2) {
      setError("Du må ha minst 2 spillere med navn");
      return;
    }

    const rounds: Round[] = [];
    for (var i = 0; i < numRounds; i++) {
      const round: Round = {
        players: filteredPlayers,
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
    if (players.length === 15) {
      setError("Kan ikke ha flere enn 7 spillere");
      return;
    }

    setError("");
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
      <div className="inner-container">
        <div className="image-wrapper">
          <img className="image" src={haffeImage} alt="haffe" />
          <img className="image" src={theoImage} alt="theo" />
        </div>
        <h1 className="header">5kamp log</h1>
        <p className="error">{error}</p>
        <div className="round-wrapper">
          <label className="round-label">{numRounds} Runder</label>
          <div className="round-buttons">
            <button
              className="round-button"
              onClick={() =>
                setNumRounds((prev) => (prev === 0 ? 0 : prev - 1))
              }
            >
              -
            </button>
            <button
              className="round-button"
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
      </div>
      <div className="abs-buttons">
        <button className="add-button" onClick={handleAddPlayer}>
          Legg til spiller
        </button>
        <button className="start-button" onClick={handleStartGame}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Lobby;
