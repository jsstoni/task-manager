"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Select } from "@/components";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import { useBoard } from "@/utils/hooks";

interface TimerData {
  timer: number;
  status: "play" | "pause";
  id: number;
  lastUpdate: number;
}

export function TimeTracking() {
  const [counter, setCounter] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const { tasks } = useBoard();

  const inProgress = useMemo(
    () => tasks.filter((task) => task.column === "In Progress"),
    [tasks],
  );

  useEffect(() => {
    const savedData = window.localStorage.getItem("timer");
    if (savedData) {
      const { timer, status, id, lastUpdate }: TimerData =
        JSON.parse(savedData);
      setTaskId(id);
      setStart(status === "play");
      setCounter(
        status === "play"
          ? timer + Math.floor((Date.now() - lastUpdate) / 1000)
          : timer,
      );
    }
  }, []);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  const setLocalData = (
    timer: number,
    id: number,
    status: "play" | "pause",
  ) => {
    const localData: TimerData = {
      timer,
      status,
      id,
      lastUpdate: Date.now(),
    };
    window.localStorage.setItem("timer", JSON.stringify(localData));
  };

  const handleStart = useCallback(() => {
    if (taskId) {
      setLocalData(counter, taskId, "play");
      setStart(true);
      return null;
    }
    alert("choose yout task");
  }, [counter, taskId]);

  const handlePause = useCallback(() => {
    const localTimer = window.localStorage.getItem("timer");
    if (localTimer && taskId) {
      setLocalData(counter, taskId, "pause");
      setStart(false);
    }
  }, [counter, taskId]);

  const handleStop = useCallback(() => {
    setCounter(0);
    setStart(false);
    setTaskId(null);
    window.localStorage.removeItem("timer");
  }, []);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Select
        name="taskid"
        className="mr-2 max-w-[160px] px-2 py-1"
        value={taskId ?? 0}
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
        onClick={!start ? handleStart : handlePause}
        className="rounded-full bg-gray-100 p-1 ring-1 ring-gray-400 dark:bg-zinc-900 dark:ring-zinc-600"
      >
        {start ? <BsPauseFill size={22} /> : <BsPlayFill size={22} />}
      </button>

      <span>{formatTime(counter)}</span>

      {!start && counter > 0 && <BsStopFill size={22} onClick={handleStop} />}
    </div>
  );
}
