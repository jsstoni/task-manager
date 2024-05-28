import { BsCalendarDate } from "react-icons/bs";
import { RowItems } from "../ui/row-items";
import { formatRelativeTime, timeDifference } from "@/utils/time";
import { cn } from "@/utils/libs/cn";

interface Props {
  value: string;
}

export function TimeDue({ value }: Props) {
  const duedate = formatRelativeTime(value);
  const timeDiff = timeDifference(value);

  return (
    <RowItems
      className={cn(
        "rounded-md bg-zinc-200 px-2 py-0.5 text-xs dark:bg-zinc-950/30",
        {
          "text-zinc-600": timeDiff > 3,
          "text-yellow-600": timeDiff <= 3,
          "text-red-600": timeDiff < 0,
        },
      )}
    >
      <BsCalendarDate /> {duedate}
    </RowItems>
  );
}
