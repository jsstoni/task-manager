import { Priority } from "@/utils/constant/tasks";
import { cn } from "@/utils/libs/cn";

interface Props {
  value: Priority;
}

export function BadgePriority({ value }: Props) {
  //priority variants
  const pv = {
    low: "bg-blue-500 text-blue-950",
    medium: "bg-yellow-500 text-yellow-950",
    high: "bg-red-500 text-red-950",
  };

  return (
    <span className={cn("rounded-md px-3 text-black", pv[value])}>{value}</span>
  );
}
