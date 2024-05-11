"use client";

import {
  ColumnsCards,
  FormCreate,
  NavBar,
  Sheet,
  SingleTask,
} from "@/components";
import { closeTask, useGetTasksQuery } from "@/utils/libs/redux";
import type { Columns } from "@/utils/constant/tasks";
import { useAppDispatch, useBoard } from "@/utils/hooks";

export function TaskBoard() {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTasksQuery(null);
  const { tasks, openTask, onlyTask } = useBoard();

  const closeSheet = () => {
    dispatch(closeTask());
  };

  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        <NavBar />

        <section className="flex flex-grow justify-between px-5">
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

      <Sheet hidden={openTask} size="xl" position="right" close={closeSheet}>
        {onlyTask && <SingleTask task={onlyTask} />}
      </Sheet>
    </>
  );
}
