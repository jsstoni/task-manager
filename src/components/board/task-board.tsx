"use client";

import React from "react";
import { NavBar } from "../ui/nav-bar";
import { useGetTasksQuery } from "@/redux";
import type { Columns } from "@/utils/constant/tasks";
import { ColumnsCards } from "@/components";

interface Props {
  children?: React.ReactNode;
}

export function TaskBoard({ children }: Props) {
  const { isLoading } = useGetTasksQuery(null);

  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <div className="flex flex-col justify-between h-screen">
      <NavBar />

      <section className="flex justify-between flex-grow">
        {columns.map((column, index) => (
          <ColumnsCards key={index} column={column} loading={isLoading} />
        ))}
      </section>
    </div>
  );
}
