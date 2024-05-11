import { BadgePriority } from "@/components";
import dayjs from "dayjs";
import { Tasks } from "@/utils/constant/tasks";

interface Props {
  task: Tasks;
}
export function SingleTask({ task }: Props) {
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
        <p className="col-span-9">{task.column}</p>

        <p className="col-span-3 dark:text-zinc-600">Created</p>
        <p className="col-span-9">{created}</p>

        <p className="col-span-3 dark:text-zinc-600">Due Date</p>
        <p className="col-span-9">{duedate}</p>
      </div>

      <div className="mt-4 rounded-xl bg-zinc-950 p-3">{task.content}</div>
    </>
  );
}
