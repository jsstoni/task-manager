import { Button } from "@/components";

export function NavBar() {
  return (
    <section className="flex items-center py-1.5 gap-4 px-4 border-b dark:border-zinc-800">
      <h1 className="text-xl">Tasks</h1>
      <Button className="ml-auto">New Task</Button>
    </section>
  );
}
