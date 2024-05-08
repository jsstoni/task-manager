import { Tasks } from "@/utils/constant/tasks";
import { BsCalendarDate, BsCheck2Square } from "react-icons/bs";

interface Props {
  task: Tasks;
}

export function StagesCards({ task }: Props) {
  return (
    <article className="dark:bg-zinc-900 p-4 rounded-md flex flex-col gap-2 border dark:border-zinc-800 hover:dark:border-slate-800">
      <p className="text-sm text-balance">{task.title}</p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <BsCalendarDate /> {task.duedate}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <small className="rounded-md bg-blue-400 px-3 text-black">
          {task.priority}
        </small>
        <small>Log: {task.log}</small>
        <small className="ml-auto flex items-center gap-1">
          <BsCheck2Square /> 0/1
        </small>
      </div>
    </article>
  );
}
