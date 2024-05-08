import { AsideLeft, TaskBoard } from "@/components";

export default function Home() {
  return (
    <>
      <AsideLeft />

      <main className="relative ml-[60px] flex-grow">
        <TaskBoard />
      </main>
    </>
  );
}
