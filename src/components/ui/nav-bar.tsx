"use client";

import { Button, ButtonFilter, TimeTracking } from "@/components";
import { openCreate } from "@/utils/libs/redux";
import { useAppDispatch } from "@/utils/hooks";
import { BsPlusLg } from "react-icons/bs";

export function NavBar() {
  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center gap-4 border-b px-9 py-2.5 dark:border-zinc-800">
      <h1 className="text-xl">Tasks</h1>

      <ButtonFilter />

      <div className="ml-auto flex items-center gap-3">
        <TimeTracking />

        <Button className="flex items-center px-2 py-0.5" onClick={() => dispatch(openCreate())}>
          <BsPlusLg className="mr-2" /> New Task
        </Button>
      </div>
    </section>
  );
}
