import { BsCalendarDate, BsCheck2Square } from "react-icons/bs";

export function StagesCards() {
  return (
    <article className="dark:bg-zinc-900 p-4 rounded-md flex flex-col gap-2 border dark:border-zinc-800 hover:dark:border-slate-800">
      <p className="text-sm text-balance">
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <BsCalendarDate /> Aug, 27
        </div>
      </div>

      <div className="flex items-center gap-2">
        <small className="rounded-md bg-blue-400 px-3 text-black">Low</small>
        <small>Log: 3h 32min</small>
        <small className="ml-auto flex items-center gap-1">
          <BsCheck2Square /> 0/1
        </small>
      </div>
    </article>
  );
}
