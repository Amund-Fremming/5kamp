interface PlayerInfoProps {
  index: number;
  removeName: () => void;
  setName: (name: string, index: number) => void;
}

const PlayerInfo = (props: PlayerInfoProps) => {
  return (
    <div className="container">
      <input
        placeholder="Navn..."
        onChange={(input) => props.setName(input.target.value, props.index)}
      />
      <button onClick={props.removeName}>-</button>
    </div>
  );
};

export default PlayerInfo;
