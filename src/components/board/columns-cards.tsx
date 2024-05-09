"use client";

import { Columns, Tasks } from "@/utils/constant/tasks";
import { cn } from "@/utils/libs/cn";
import { StagesCards } from "./stages-cards";
import { useMemo } from "react";
import { useDnD } from "@/utils/hooks";

interface Props {
  column: Columns;
  loading: boolean;
  tasks: Tasks[];
}

export function ColumnsCards({ column, loading, tasks }: Props) {
  const { onDragOver, onDragEnd, whereMove } = useDnD();
  //tasks by columns
  const tasksByColumns = useMemo(
    () => tasks.filter((task) => task.column === column),
    [tasks, column]
  );
  //column variant
  const cv = {
    Backlog: "border-l-4 border-zinc-400 px-4",
    "In Progress": "border-l-4 border-yellow-400 px-4",
    Test: "border-l-4 border-blue-400 px-4",
    Done: "border-l-4 border-green-400 px-4",
  };

  return (
    <section
      className="columns-card flex-1 select-none flex flex-col gap-4 p-4"
      onDragOver={(ev) => onDragOver(ev, column)}
      onDragEnd={(ev) => onDragEnd(ev)}
    >
      <p className={cn("flex items-center", cv[column])}>
        {column}{" "}
        <small className="bg-zinc-200 dark:bg-zinc-900 px-2 ml-3 rounded-md">
          {tasksByColumns.length}
        </small>
      </p>

      {loading && <span>loading...</span>}

      {!loading &&
        tasks &&
        tasksByColumns.map((task) => <StagesCards key={task.id} task={task} />)}

      {whereMove === column && <div className="h-0.5 bg-red-500"></div>}
    </section>
  );
}
