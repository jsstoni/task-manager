import { Tasks } from "@/utils/constant/tasks";
import { BadgePriority } from "./badge-priority";
import dayjs from "dayjs";

interface Props {
  task: Tasks;
}
export function SingleTask({ task }: Props) {
  const duedate = dayjs(task.duedate).format("MMM D, YYYY");
  const created = dayjs(task.createdAt).format("MMM D, YYYY");
  return (
    <>
      <h1 className="text-2xl mb-4">{task.title}</h1>

      <div className="grid grid-cols-12 gap-3">
        <p className="col-span-3 dark:text-zinc-600">Priority</p>
        <p className="col-span-9">
          <BadgePriority value={task.priority} />
        </p>

        <p className="col-span-3 dark:text-zinc-600">Status</p>
        <p className="col-span-9">{task.column}</p>

        <p className="col-span-3 dark:text-zinc-600">Created</p>
        <p className="col-span-9">{created}</p>

        <p className="col-span-3 dark:text-zinc-600">Due Date</p>
        <p className="col-span-9">{duedate}</p>
      </div>

      <div className="bg-zinc-950 rounded-xl p-3 mt-4">{task.content}</div>
    </>
  );
}
