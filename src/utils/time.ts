import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Expire } from "./constant/tasks";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatSecondsToElapsedTime(seconds: number) {
  const duration = dayjs.duration(seconds, "seconds");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const secs = duration.seconds();

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else if (minutes > 0) {
    formattedTime += `${minutes}:${secs.toString().padStart(2, "0")}`;
  } else {
    formattedTime += `${secs}`;
  }

  return formattedTime;
}

export function formatRelativeTime(date: string) {
  return dayjs().to(dayjs(date));
}

export function timeDifference(date: string) {
  return dayjs(date).diff(dayjs(), "day");
}

export function filterExpire(dueDate: Date, expire: Expire) {
  const currentDate = new Date();
  if (expire === "day") {
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toDateString() === dueDate.toDateString();
  } else if (expire === "week") {
    const nextWeek = new Date();
    nextWeek.setDate(currentDate.getDate() + 7);
    return dueDate > currentDate && dueDate <= nextWeek;
  } else if (expire === "month") {
    const nextMonth = new Date();
    nextMonth.setMonth(currentDate.getMonth() + 1);
    return dueDate > currentDate && dueDate <= nextMonth;
  }
  return false;
}
