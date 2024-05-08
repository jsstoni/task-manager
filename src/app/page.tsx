import { ColumnsCards, TaskBoard } from "@/components";
import { Columns } from "@/utils/constant/tasks";

export default function Home() {
  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  return (
    <main className="container relative mx-auto flex-grow">
      <TaskBoard>
        {columns.map((column, index) => (
          <ColumnsCards key={index} column={column} />
        ))}
      </TaskBoard>
    </main>
  );
}
