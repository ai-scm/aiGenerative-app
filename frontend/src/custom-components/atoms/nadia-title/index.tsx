type Props = {
  onClick?: () => void;
};

const NadiaTitle: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className={`my-3 flex h-10 items-center px-3 text-xl font-bold text-houndoc-primary ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      }`}
      onClick={onClick}
    >
      Nadia Smart Buddy
    </div>
  );
};

export default NadiaTitle;
