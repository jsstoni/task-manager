"use client";

import { BsFilter } from "react-icons/bs";
import { Button, Input } from "@/components";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/libs/cn";
import { useAppDispatch } from "@/utils/hooks";
import { filterTasks } from "@/utils/libs/redux";
import { Expire, Priority } from "@/utils/constant/tasks";

export function ButtonFilter() {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleFilter(formData: FormData) {
    const keyword = formData.get("keyword");
    const expire = formData.getAll("expire[]");
    const priority = formData.getAll("priority[]");
    dispatch(
      filterTasks({
        keyword: keyword as string,
        priority: priority as Priority[],
        expire: expire as Expire[],
      }),
    );
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        className={cn("flex items-center gap-1 py-0", {
          "bg-zinc-200 dark:bg-zinc-900": open,
        })}
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsFilter /> Filters
      </Button>

      <div
        className={cn(
          "absolute left-0 top-6 z-10 w-[300px] overflow-hidden rounded-md border bg-white p-3 transition-all duration-150 ease-in-out dark:border-zinc-800 dark:bg-zinc-900",
          { "invisible max-h-0": !open, "max-h-screen": open },
        )}
      >
        <form action={handleFilter}>
          <small className="text-zinc-700">keyword</small>
          <Input name="keyword" placeholder="enter a keyword" />

          <small className="mt-3 block text-zinc-700">Expiration</small>
          <label htmlFor="exp_day">
            <Input
              type="checkbox"
              name="expire[]"
              value="day"
              className="w-auto"
              id="exp_day"
            />
            expires the next day
          </label>
          <label htmlFor="exp_week">
            <Input
              type="checkbox"
              name="expire[]"
              value="week"
              className="w-auto"
              id="exp_week"
            />
            due next week
          </label>
          <label htmlFor="exp_month">
            <Input
              type="checkbox"
              name="expire[]"
              value="month"
              className="w-auto"
              id="exp_month"
            />
            expires next month
          </label>

          <small className="mt-3 block text-zinc-700">Priority</small>
          <label htmlFor="low">
            <Input
              type="checkbox"
              name="priority[]"
              value="low"
              className="w-auto"
              id="low"
            />
            Low
          </label>
          <label htmlFor="medium">
            <Input
              type="checkbox"
              name="priority[]"
              value="medium"
              className="w-auto"
              id="medium"
            />
            Medium
          </label>
          <label htmlFor="high">
            <Input
              type="checkbox"
              name="priority[]"
              value="high"
              className="w-auto"
              id="high"
            />
            High
          </label>

          <Button type="submit" variant="secondary" className="py-0">
            Filter
          </Button>
        </form>
      </div>
    </div>
  );
}
