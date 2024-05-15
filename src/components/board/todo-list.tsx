import { BsTrash } from "react-icons/bs";
import { CheckList } from "@/components";
import { Subtask } from "@/utils/constant/tasks";

interface Props {
  todo: Subtask;
  remove?: boolean;
}

export const TodoList = ({ todo, remove = true }: Props) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-md bg-zinc-200 p-2 dark:bg-zinc-800">
      <CheckList value={todo.check} />
      <p className="flex-grow">{todo.title}</p>
      {remove && <BsTrash className="flex-shrink-0 self-baseline" size={22} />}
    </div>
  );
};
