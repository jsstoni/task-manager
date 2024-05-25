import { BsClock } from "react-icons/bs";
import { RowItems } from "../ui/row-items";
import { formatSecondsToElapsedTime } from "@/utils/time";

interface Props {
  value: number;
}

export function TimeLog({ value }: Props) {
  const log = formatSecondsToElapsedTime(value);

  return (
    value > 0 && (
      <RowItems className="rounded-md bg-zinc-200 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-950/30">
        <BsClock /> Log: {log}
      </RowItems>
    )
  );
}
