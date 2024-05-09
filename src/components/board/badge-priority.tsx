import { Priority } from "@/utils/constant/tasks";
import { cn } from "@/utils/libs/cn";

interface Props {
  value: Priority;
}

export function BadgePriority({ value }: Props) {
  //priority variants
  const pv = {
    low: "bg-cyan-400",
    medium: "bg-yellow-400",
    high: "bg-red-400",
  };

  return <small className={cn("px-2 text-black rounded-md", pv[value])}>{value}</small>;
}
