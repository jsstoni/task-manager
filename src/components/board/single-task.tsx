import { Tasks } from "@/utils/constant/tasks";
import { BadgePriority } from "./badge-priority";

interface Props {
  task: Tasks;
}
export function SingleTask({ task }: Props) {
  return (
    <>
      <h1 className="text-2xl mb-4">{task.title}</h1>
      <div className="grid grid-cols-12 gap-2">
        <p className="col-span-3 dark:text-zinc-600">Priority</p>
        <p className="col-span-9">
          <BadgePriority value={task.priority} />
        </p>
        <p className="col-span-3 dark:text-zinc-600">Status</p>
        <p className="col-span-9">{task.column}</p>
        <p className="col-span-3 dark:text-zinc-600">Due Date</p>
        <p className="col-span-9">{task.duedate}</p>
        <p className="col-span-3 dark:text-zinc-600">Created</p>
        <p className="col-span-9">{task.createdAt}</p>
      </div>

      <p className="uppercase font-semibold text-xs mt-4 text-zinc-600">
        Description
      </p>
      <div className="bg-zinc-950 rounded-xl p-3 mt-1">{task.content}</div>
    </>
  );
}
