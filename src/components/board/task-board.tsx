"use client";

import { closeTask, useGetTasksQuery } from "@/redux";
import type { Columns } from "@/utils/constant/tasks";
import {
  ColumnsCards,
  FormCreate,
  Sheet,
  SingleTask,
  NavBar,
} from "@/components";
import { useAppDispatch, useBoard } from "@/utils/hooks";

interface Props {}

export function TaskBoard({}: Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTasksQuery(null);
  const { tasks, openTask, onlyTask } = useBoard();

  const closeSheet = () => {
    dispatch(closeTask());
  };

  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <NavBar />

        <section className="flex justify-between flex-grow px-5">
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
