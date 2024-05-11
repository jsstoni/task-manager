"use client";

import { useEffect, useMemo, useState } from "react";
import { Select } from "@/components";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import { useBoard } from "@/utils/hooks";

export function TimeTracking() {
  const [counter, setCounter] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [isTaskId, setTaskId] = useState<number | null>(null);

  const { tasks } = useBoard();

  const inProgress = useMemo(
    () => tasks.filter((task) => task.column === "In Progress"),
    [tasks],
  );

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  const isTimer = useMemo(() => {
    const hours = Math.floor(counter / 3600);
    const restSeconds = counter % 3600;
    const minutes = Math.floor(restSeconds / 60);
    const seconds = restSeconds % 60;

    const hourString = hours.toString().padStart(2, "0");
    const minuteString = minutes.toString().padStart(2, "0");
    const secondString = seconds.toString().padStart(2, "0");

    return hours === 0
      ? `${minuteString}:${secondString}`
      : `${hourString}:${minuteString}:${secondString}`;
  }, [counter]);

  const handleStart = () => {
    if (isTaskId) {
      setStart((prevStart) => !prevStart);
      return;
    }
    alert("choose yout task");
  };

  const handleStop = () => {
    setCounter(0);
    setStart(false);
    setTaskId(null);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Select
        name="taskid"
        className="mr-2 max-w-[160px] px-2 py-1"
        onChange={(e) => setTaskId(+e.target.value)}
      >
        <option>choose your task</option>
        {inProgress.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </Select>

      <button
        onClick={handleStart}
        className="rounded-full bg-gray-100 p-1 ring-1 ring-gray-400 dark:bg-zinc-900 dark:ring-zinc-600"
      >
        {start ? <BsPauseFill size={22} /> : <BsPlayFill size={22} />}
      </button>

      <span>{isTimer}</span>

      {!start && counter > 0 && <BsStopFill size={22} onClick={handleStop} />}
    </div>
  );
}