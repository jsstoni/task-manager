"use client";

import { BsCheck, BsTrash } from "react-icons/bs";
import { CheckList } from "@/components";
import { Subtask } from "@/utils/constant/tasks";
import { useState } from "react";
import {
  usePutSubtaskMutation,
  useRmSubtaskMutation,
} from "@/utils/libs/redux";

interface Props {
  todo: Subtask;
  remove?: boolean;
}

export const TodoList = ({ todo, remove = true }: Props) => {
  const [accept, setAccept] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(todo.check);
  const [rmSubtask] = useRmSubtaskMutation();
  const [putSubtask] = usePutSubtaskMutation();

  const handleRemove = () => {
    setAccept((prev) => !prev);
  };

  const rm = async (id: number) => {
    await rmSubtask(id);
  };

  const handleCheck = async (id: number) => {
    setCheck((prev) => !prev);
    await putSubtask({ id, check: !check });
  };

  return (
    <div className="flex w-full items-center gap-3 rounded-md bg-zinc-200 p-2 dark:bg-zinc-800/40">
      <CheckList value={check} onClick={() => handleCheck(todo.id)} />
      <p className="flex-grow">{todo.title}</p>
      {accept && (
        <BsCheck
          size={22}
          onClick={() => rm(todo.id)}
          className="hover:cursor-pointer hover:fill-blue-500"
        />
      )}
      {remove && (
        <BsTrash
          className="flex-shrink-0 self-baseline hover:cursor-pointer hover:fill-red-500"
          size={20}
          onClick={handleRemove}
        />
      )}
    </div>
  );
};
