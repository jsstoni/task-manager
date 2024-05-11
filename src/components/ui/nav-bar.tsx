"use client";

import { Button, TimeTracking } from "@/components";
import { openCreate } from "@/utils/libs/redux";
import { useAppDispatch } from "@/utils/hooks";

export function NavBar() {
  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center gap-4 border-b px-9 py-2.5 dark:border-zinc-800">
      <h1 className="text-xl">Tasks</h1>

      <div className="ml-auto flex items-center gap-3">
        <TimeTracking />

        <Button className="px-4 py-0.5" onClick={() => dispatch(openCreate())}>
          New Task
        </Button>
      </div>
    </section>
  );
}
