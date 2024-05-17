"use client";

import { BsCheck, BsTrash } from "react-icons/bs";
import { CheckList } from "@/components";
import { Subtask } from "@/utils/constant/tasks";
import { useState } from "react";
import { useRmSubtaskMutation } from "@/utils/libs/redux";

interface Props {
  todo: Subtask;
  remove?: boolean;
}

export const TodoList = ({ todo, remove = true }: Props) => {
  const [accept, setAccept] = useState<boolean>(false);
  const [rmSubtask] = useRmSubtaskMutation();

  const handleRemove = () => {
    setAccept((prev) => !prev);
  };

  const rm = async (id: number) => {
    const rs = await rmSubtask(id);
    console.log(rs);
  };

  return (
    <div className="flex w-full items-center gap-2 rounded-md bg-zinc-200 p-2 dark:bg-zinc-800">
      <CheckList value={todo.check} />
      <p className="flex-grow">{todo.title}</p>
      {accept && (
        <BsCheck
          size={22}
          onClick={() => rm(todo.id)}
          className="hover:cursor-pointer"
        />
      )}
      {remove && (
        <BsTrash
          className="flex-shrink-0 self-baseline hover:cursor-pointer"
          size={20}
          onClick={handleRemove}
        />
      )}
    </div>
  );
};
