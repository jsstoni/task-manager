"use client";

import { BadgePriority } from "@/components";
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

  const handleClick = (task: Tasks) => {
    dispatch(setOnlyTask(task));
  };

  return (
    <article
      className={cn(
        { "opacity-10": idTask === task.id },
        "flex flex-col gap-2 rounded-md border p-4 dark:border-zinc-800 dark:bg-zinc-900 hover:dark:border-slate-800",
      )}
      draggable
      onDragStart={(ev) => onDragStart(ev, task.id)}
      onDragEnd={(ev) => onDragEnd(ev)}
      onClick={() => handleClick(task)}
    >
      <p className="text-balance text-sm">{task.title}</p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <BsCalendarDate /> {duedate}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <BadgePriority value={task.priority} />

        <small>Log: {task.log}</small>

        <small className="ml-auto flex items-center gap-1">
          <BsCheck2Square /> 0/1
        </small>
      </div>
    </article>
  );
}
