"use client";

import { BsFilter } from "react-icons/bs";
import { Button } from "./button";
import { useState } from "react";
import { cn } from "@/utils/libs/cn";
import { Input } from "./input";

export function ButtonFilter() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <Button
        className={cn("flex items-center gap-1 py-0", {
          "bg-zinc-200 dark:bg-zinc-900": open,
        })}
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsFilter /> Filters
      </Button>
      {open && (
        <div className="absolute left-0 top-6 z-10 w-[300px] rounded-md border bg-white p-3 dark:border-zinc-700 dark:bg-zinc-700">
          <small className="text-zinc-800">keyword</small>
          <Input name="keyword" placeholder="enter a keyword" />

          <small className="text-zinc-800">Expiration</small>
          <label htmlFor="exp_day">
            <Input type="checkbox" className="w-auto" id="exp_day" /> expires
            the next day
          </label>
          <label htmlFor="exp_week">
            <Input type="checkbox" className="w-auto" id="exp_week" /> due next
            week
          </label>
          <label htmlFor="exp_month">
            <Input type="checkbox" className="w-auto" id="exp_month" /> expires
            next month
          </label>

          <small className="text-zinc-800">Priority</small>
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
      )}
    </div>
  );
}
