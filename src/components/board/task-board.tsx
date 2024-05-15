"use client";

import {
  ColumnsCards,
  FormCreate,
  NavBar,
  Sheet,
  SingleTask,
} from "@/components";
import { useGetTasksQuery } from "@/utils/libs/redux";
import type { Columns } from "@/utils/constant/tasks";
import { useBoard } from "@/utils/hooks";

export function TaskBoard() {
  const { isLoading } = useGetTasksQuery(null);
  const { tasks, openTask, onlyTask } = useBoard();

  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        <NavBar />

        <section className="flex flex-grow justify-between overflow-auto px-5">
          {columns.map((column, index) => (
            <ColumnsCards
              key={index}
              tasks={tasks}
              column={column}
              loading={isLoading}
            />
          ))}
        </section>
      </div>

      <FormCreate />

      <Sheet hidden={openTask} size="xl" position="right">
        {onlyTask && <SingleTask task={onlyTask} />}
      </Sheet>
    </>
  );
}
