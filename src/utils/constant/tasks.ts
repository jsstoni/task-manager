export type Columns = "Backlog" | "In Progress" | "Test" | "Done";

export type Priority = "low" | "medium" | "high";

export interface Tasks {
  id: number;
  title: string;
  content: string;
  priority: Priority;
  log: number;
  duedate?: string;
  user_id: number;
  column: Columns;
}
