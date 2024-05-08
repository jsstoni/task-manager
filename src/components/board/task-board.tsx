import React from "react";
import { NavBar } from "../ui/nav-bar";

interface Props {
  children?: React.ReactNode;
}

export function TaskBoard({ children }: Props) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <NavBar />

      <section className="flex justify-between flex-grow">{children}</section>
    </div>
  );
}
