"use client";

import { useMemo } from "react";
import { ItemsCards, RowItems } from "@/components";
import { Columns, Tasks } from "@/utils/constant/tasks";
import { useDnD } from "@/utils/hooks";
import { cn } from "@/utils/libs/cn";
import { BsCircleFill } from "react-icons/bs";

interface Props {
  column: Columns;
  loading: boolean;
  tasks: Tasks[];
}

export function ColumnsCards({ column, loading, tasks }: Props) {
  const { onDragOver, onDrop, onDragEnd, whereMove } = useDnD();
  //tasks by columns
  const tasksByColumns = useMemo(
    () => tasks.filter((task) => task.column === column),
    [tasks, column],
  );
  //column variant
  const cv = {
    Backlog: "fill-zinc-400",
    "In Progress": "fill-yellow-400",
    Test: "fill-blue-400",
    Done: "fill-green-400",
  };

  return (
    <section
      className="columns-card relative flex flex-1 select-none flex-col gap-4 overflow-auto p-4"
      onDragOver={(ev) => onDragOver(ev, column)}
      onDrop={onDrop}
      onDragEnd={(ev) => onDragEnd(ev)}
    >
      <RowItems>
        <BsCircleFill className={cn("mr-2", cv[column])} />
        <p>{column}</p>
        <small className="ml-1 rounded-md bg-zinc-200 px-2 py-0.5 dark:bg-zinc-900">
          {tasksByColumns.length}
        </small>
      </RowItems>

      {loading && <span>loading...</span>}

      {!loading &&
        tasksByColumns.map((task) => <ItemsCards key={task.id} task={task} />)}

      {whereMove === column && <div className="h-0.5 bg-red-500"></div>}
    </section>
  );
}
