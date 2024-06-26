"use client";

import {
  BadgePriority,
  Button,
  CheckList,
  Input,
  TimeDue,
  TimeLog,
  TodoList,
} from "@/components";
import dayjs from "dayjs";
import { Subtask, Tasks } from "@/utils/constant/tasks";
import { useState } from "react";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { useAddSubtaskMutation } from "@/utils/libs/redux";

interface Props {
  task: Tasks;
}
export function SingleTask({ task }: Props) {
  const [subtask, setSubtask] = useState<Subtask[]>([]);
  const [submitSubtask, { isLoading }] = useAddSubtaskMutation();

  const addSubtask = () => {
    const subTask = {
      title: "",
      check: false,
      tasks_id: task.id,
    };
    setSubtask((prevTodo) => [...prevTodo, subTask as Subtask]);
  };

  const removeSubtask = (index: number) => {
    const updatedTodoList = subtask.filter((_, i) => i !== index);
    setSubtask(updatedTodoList);
  };

  function handleValue<K extends keyof Subtask>(
    index: number,
    key: K,
    value: Subtask[K],
  ) {
    const updatedList = [...subtask];
    updatedList[index] = {
      ...updatedList[index],
      [key]: value,
    };
    setSubtask(updatedList);
  }

  async function handleSave() {
    const todos = [...subtask];
    const validateTitle = todos.every((todo) => todo.title.trim() !== "");
    if (!validateTitle) {
      alert("faltan titulos por completar");
      return;
    }
    await submitSubtask(subtask);
    setSubtask([]);
  }

  const duedate = dayjs(task.duedate).format("MMM D, YYYY");
  const created = dayjs(task.createdAt).format("MMM D, YYYY");
  return (
    <>
      <h1 className="mb-4 text-2xl">{task.title}</h1>

      <div className="grid grid-cols-12 gap-3">
        <p className="col-span-3 dark:text-zinc-600">Priority</p>
        <p className="col-span-9">
          <BadgePriority value={task.priority} />
        </p>

        <p className="col-span-3 dark:text-zinc-600">Status</p>
        <div className="col-span-9 flex gap-2">
          {task.column} <TimeLog value={task.log} />
        </div>

        <p className="col-span-3 dark:text-zinc-600">Created</p>
        <p className="col-span-9">{created}</p>

        <p className="col-span-3 dark:text-zinc-600">Due Date</p>
        <div className="col-span-9 flex gap-2">
          {duedate} <TimeDue value={task.duedate} />
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-200 p-3 dark:bg-zinc-950/40">
        {task.content}
      </div>

      <div className="my-2 flex items-center gap-2">
        <p>Subtask</p>
        <Button
          variant="link"
          className="ml-auto flex items-center gap-1"
          onClick={addSubtask}
        >
          <BsPlusLg /> Add Subtask
        </Button>
        {subtask.length > 0 && (
          <Button variant="secondary" onClick={handleSave} loader={isLoading}>
            Saved
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {task &&
          task.subtask &&
          task.subtask.length > 0 &&
          task.subtask.map((todo) => <TodoList key={todo.id} todo={todo} />)}

        {subtask &&
          subtask.map((todo, index) => (
            <div className="flex w-full items-center gap-3" key={index}>
              <CheckList
                value={todo.check}
                onClick={() => handleValue(index, "check", !todo.check)}
              />
              <Input
                type="text"
                placeholder="write something"
                onChange={(e) => handleValue(index, "title", e.target.value)}
                value={todo?.title}
              />

              <BsTrash
                size={22}
                onClick={() => removeSubtask(index)}
                className="hover:cursor-pointer hover:fill-red-500"
              />
            </div>
          ))}
      </div>
    </>
  );
}
