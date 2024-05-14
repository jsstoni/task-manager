import { BsCheck } from "react-icons/bs";

interface Props {
  value: boolean;
  onClick?: () => void;
}

export const CheckList = ({ value, onClick }: Props) => {
  return (
    <div
      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-zinc-600"
      onClick={onClick}
    >
      {value && <BsCheck color="#767FFF" />}
    </div>
  );
};
