import { AsideLeft, ColumnsCards, NavBar, TaskBoard } from "@/components";
import { Columns } from "@/utils/constant/tasks";

export default function Home() {
  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <>
      <AsideLeft />

      <main className="relative ml-[60px] flex-grow">
        <TaskBoard>
          {columns.map((column, index) => (
            <ColumnsCards key={index} column={column} />
          ))}
        </TaskBoard>
      </main>
    </>
  );
}
