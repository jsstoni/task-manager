import { Columns } from "@/utils/constant/tasks";
import { cn } from "@/utils/libs/cn";
import { StagesCards } from "./stages-cards";

interface Props {
  column: Columns;
}

export function ColumnsCards({ column }: Props) {
  //column variant
  const cv = {
    Backlog: "border-l-4 border-zinc-400 px-4",
    "In Progress": "border-l-4 border-yellow-400 px-4",
    Test: "border-l-4 border-blue-400 px-4",
    Done: "border-l-4 border-green-400 px-4",
  };

  return (
    <section className="columns-card flex-1 select-none flex flex-col gap-4 p-4">
      <p className={cn("flex items-center", cv[column])}>
        {column}{" "}
        <small className="dark:bg-zinc-900 px-2 ml-3 rounded-md">0</small>
      </p>

      {column === "Backlog" && <StagesCards />}
    </section>
  );
}
