import "./playerInfoStyles.css";

interface PlayerInfoProps {
  index: number;
  removeName: () => void;
  setName: (name: string, index: number) => void;
}

const PlayerInfo = (props: PlayerInfoProps) => {
  return (
    <div className="playerinfo__container">
      <input
        className="playerinfo__input"
        placeholder="Navn..."
        onChange={(input) => props.setName(input.target.value, props.index)}
      />
      <button className="playerinfo__button" onClick={props.removeName}>
        x
      </button>
    </div>
  );
};

export default PlayerInfo;
