"use client";

import { Button, TimeTracking } from "@/components";
import { openCreate } from "@/redux";
import { useAppDispatch } from "@/utils/hooks";

export function NavBar() {
  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center py-2.5 gap-4 px-4 border-b dark:border-zinc-800">
      <h1 className="text-xl">Tasks</h1>

      <div className="ml-auto flex items-center gap-3">
        <TimeTracking />

        <Button className="py-0.5 px-4" onClick={() => dispatch(openCreate())}>
          New Task
        </Button>
      </div>
    </section>
  );
}
