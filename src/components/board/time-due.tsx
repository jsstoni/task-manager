import { BsCalendarDate } from "react-icons/bs";
import { RowItems } from "../ui/row-items";
import { formatRelativeTime } from "@/utils/time";

interface Props {
  value: string | undefined;
}

export function TimeDue({ value }: Props) {
  const duedate = formatRelativeTime(value);

  return (
    <RowItems className="rounded-md bg-zinc-950/30 px-2 py-0.5 text-xs text-zinc-500">
      <BsCalendarDate /> {duedate}
    </RowItems>
  );
}
