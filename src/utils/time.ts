import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

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

export function formatRelativeTime(date: string | undefined) {
  return dayjs().from(date, true);
}
