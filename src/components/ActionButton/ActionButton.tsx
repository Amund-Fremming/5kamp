import "./actionButtonStyles.css";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

export const ActionButton = ({ text, onClick }: ActionButtonProps) => {
  return (
    <button className="actionbutton__container" onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
