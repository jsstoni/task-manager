"use client";

import { BadgePriority, RowItems } from "@/components";
import { setOnlyTask } from "@/utils/libs/redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BsCalendarDate, BsCheck2Square } from "react-icons/bs";
import { Tasks } from "@/utils/constant/tasks";
import { useAppDispatch, useDnD } from "@/utils/hooks";
import { cn } from "@/utils/libs/cn";

interface Props {
  task: Tasks;
}

export function ItemsCards({ task }: Props) {
  const dispatch = useAppDispatch();
  const { onDragStart, onDragEnd, idTask } = useDnD();
  dayjs.extend(relativeTime);
  const duedate = dayjs().from(task.duedate, true);

  let countCompleted =
    task &&
    task.subtask &&
    task.subtask.filter((todo) => todo.check === true).length;

  let countTodo = task && task.subtask && task.subtask.length;

  const handleClick = (task: Tasks) => {
    dispatch(setOnlyTask(task));
  };

  return (
    <article
      className={cn(
        { "opacity-10": idTask === task.id },
        "flex flex-col items-start gap-1 rounded-md border p-3.5 shadow dark:border-zinc-900 dark:bg-zinc-900 hover:dark:border-slate-800",
      )}
      draggable
      onDragStart={(ev) => onDragStart(ev, task.id)}
      onDragEnd={(ev) => onDragEnd(ev)}
      onClick={() => handleClick(task)}
    >
      <div className="my-1">
        <p className="text-balance">{task.title}</p>
        <p className="line-clamp-2 text-sm text-zinc-600">{task.content}</p>
      </div>

      <div className="flex w-full items-center gap-2 text-sm text-zinc-500">
        <BadgePriority value={task.priority} />

        <RowItems className="rounded-md bg-zinc-100 px-2 py-0.5 dark:bg-zinc-950/30">
          <BsCalendarDate /> {duedate}
        </RowItems>

        {task.subtask && task.subtask.length > 0 && (
          <RowItems className="ml-auto">
            <BsCheck2Square /> {countCompleted}/{countTodo}
          </RowItems>
        )}
      </div>
    </article>
  );
}
