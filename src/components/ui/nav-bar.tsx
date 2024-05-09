"use client";

import { Button } from "@/components";
import { toggleCreate } from "@/redux";
import { useAppDispatch } from "@/utils/hooks";

export function NavBar() {
  const dispatch = useAppDispatch();

  return (
    <section className="flex items-center py-2.5 gap-4 px-4 border-b dark:border-zinc-800">
      <h1 className="text-xl">Tasks</h1>
      <Button
        className="ml-auto py-0.5 px-4"
        onClick={() => dispatch(toggleCreate())}
      >
        New Task
      </Button>
    </section>
  );
}
