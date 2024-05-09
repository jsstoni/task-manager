"use client";

import { NavBar } from "../ui/nav-bar";
import { toggleCreate, useGetTasksQuery } from "@/redux";
import type { Columns } from "@/utils/constant/tasks";
import { ColumnsCards, Modal } from "@/components";
import { useAppDispatch, useBoard } from "@/utils/hooks";

interface Props {}

export function TaskBoard({}: Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTasksQuery(null);
  const { modalCreate } = useBoard();

  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <NavBar />

        <section className="flex justify-between flex-grow">
          {columns.map((column, index) => (
            <ColumnsCards key={index} column={column} loading={isLoading} />
          ))}
        </section>
      </div>

      <Modal
        title="Create Task"
        isOpen={modalCreate}
        close={() => dispatch(toggleCreate())}
      ></Modal>
    </>
  );
}
