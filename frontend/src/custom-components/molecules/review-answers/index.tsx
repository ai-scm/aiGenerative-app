import { PiThumbsUp, PiThumbsUpFill } from "react-icons/pi";
import Tooltip from "../../../components/Tooltip";
import ButtonIcon from "../../../components/ButtonIcon";


type FeedbackButtonIconProps = {
  isActive: boolean;
  tooltipText: string;
  onClick: () => void;
};

const FeedbackButtonIcon: React.FC<FeedbackButtonIconProps> = ({
  isActive,
  tooltipText,
  onClick,
}) => {
  return (
    <ButtonIcon
      className="text-dark-gray dark:text-light-gray"
      onClick={onClick}
    >
      <Tooltip message={tooltipText} direction="left" className="cursor-pointer">
        {isActive ? <PiThumbsUpFill /> : <PiThumbsUp />}
      </Tooltip>
    </ButtonIcon>
  );
};

export default FeedbackButtonIcon;