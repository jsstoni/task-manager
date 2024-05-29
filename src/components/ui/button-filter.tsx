"use client";

import { BsFilter } from "react-icons/bs";
import { Button, Input } from "@/components";
import { useRef, useState } from "react";
import { cn } from "@/utils/libs/cn";
import { useAppDispatch } from "@/utils/hooks";
import { filterTasks } from "@/utils/libs/redux";
import { Expire, Priority } from "@/utils/constant/tasks";

export function ButtonFilter() {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [formValues, setFormValues] = useState({
    keyword: "",
    expire: [],
    priority: [],
  });

  function handleFilter(values: typeof formValues) {
    dispatch(
      filterTasks({
        keyword: values.keyword,
        priority: values.priority as Priority[],
        expire: values.expire as Expire[],
      }),
    );
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setFormValues((prevValues) => {
      let updatedValues;
      if (type === "checkbox") {
        const values = prevValues[name as keyof typeof prevValues] as string[];
        if (checked) {
          updatedValues = { ...prevValues, [name]: [...values, value] };
        } else {
          updatedValues = {
            ...prevValues,
            [name]: values.filter((v) => v !== value),
          };
        }
      } else {
        updatedValues = { ...prevValues, [name]: value };
      }
      handleFilter(updatedValues); // Llamar a handleFilter directamente
      return updatedValues;
    });
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
        <form>
          <small className="text-zinc-700">keyword</small>
          <Input
            name="keyword"
            placeholder="enter a keyword"
            value={formValues.keyword}
            onChange={handleChange}
          />

          <small className="mt-3 block text-zinc-700">Expiration</small>
          <label htmlFor="exp_day">
            <Input
              type="checkbox"
              name="expire"
              value="day"
              className="w-auto"
              id="exp_day"
              onChange={handleChange}
            />
            expires the next day
          </label>
          <label htmlFor="exp_week">
            <Input
              type="checkbox"
              name="expire"
              value="week"
              className="w-auto"
              id="exp_week"
              onChange={handleChange}
            />
            due next week
          </label>
          <label htmlFor="exp_month">
            <Input
              type="checkbox"
              name="expire"
              value="month"
              className="w-auto"
              id="exp_month"
              onChange={handleChange}
            />
            expires next month
          </label>

          <small className="mt-3 block text-zinc-700">Priority</small>
          <label htmlFor="low">
            <Input
              type="checkbox"
              name="priority"
              value="low"
              className="w-auto"
              id="low"
              onChange={handleChange}
            />
            Low
          </label>
          <label htmlFor="medium">
            <Input
              type="checkbox"
              name="priority"
              value="medium"
              className="w-auto"
              id="medium"
              onChange={handleChange}
            />
            Medium
          </label>
          <label htmlFor="high">
            <Input
              type="checkbox"
              name="priority"
              value="high"
              className="w-auto"
              id="high"
              onChange={handleChange}
            />
            High
          </label>
        </form>
      </div>
    </div>
  );
}
