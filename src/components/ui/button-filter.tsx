"use client";

import { BsFilter } from "react-icons/bs";
import { Button } from "./button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/libs/cn";
import { Input } from "./input";

export function ButtonFilter() {
  const [open, setOpen] = useState<boolean>(false);

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
        <small className="text-zinc-700">keyword</small>
        <Input name="keyword" placeholder="enter a keyword" />

        <small className="mt-3 block text-zinc-700">Expiration</small>
        <label htmlFor="exp_day">
          <Input type="checkbox" className="w-auto" id="exp_day" /> expires the
          next day
        </label>
        <label htmlFor="exp_week">
          <Input type="checkbox" className="w-auto" id="exp_week" /> due next
          week
        </label>
        <label htmlFor="exp_month">
          <Input type="checkbox" className="w-auto" id="exp_month" /> expires
          next month
        </label>

        <small className="mt-3 block text-zinc-700">Priority</small>
        <label htmlFor="low">
          <Input type="checkbox" className="w-auto" id="low" /> Low
        </label>
        <label htmlFor="medium">
          <Input type="checkbox" className="w-auto" id="medium" /> Medium
        </label>
        <label htmlFor="high">
          <Input type="checkbox" className="w-auto" id="high" /> High
        </label>
      </div>
    </div>
  );
}
