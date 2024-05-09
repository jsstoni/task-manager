import { clean, setIdTask, setWhereMove, updateTasks, useSetColumnMutation } from "@/redux";
import { useAppDispatch, useBoard } from "@/utils/hooks"
import { Columns } from "../constant/tasks";

export function useDnD() {
  const dispatch = useAppDispatch();
  const { idTask, whereMove, tasks } = useBoard();

  const [updateColumn] = useSetColumnMutation();

  const onDragStart = (ev: React.DragEvent, id: number) => {
    dispatch(setIdTask(id));
    ev.dataTransfer.effectAllowed = "move";
  }

  const onDragEnd = (ev: React.DragEvent) => {
    ev.preventDefault();
    dispatch(clean());
  }

  const onDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    const taskIndex = tasks.findIndex((task) => task.id === idTask);
    let selectedTask = { ...tasks[taskIndex] };

    if (!whereMove || selectedTask.column === whereMove) {
      return;
    }

    selectedTask.column = whereMove;

    const updated = tasks
      .filter((task) => task.id !== idTask)
      .concat(selectedTask);

    dispatch(updateTasks(updated));

    if (idTask) {
      updateColumn({ id: idTask, column: whereMove });
    }
  }

  const onDragOver = (ev: React.DragEvent, column: Columns) => {
    dispatch(setWhereMove(column));
    ev.preventDefault();
  }

  return { onDragStart, onDragEnd, onDrop, onDragOver, idTask, whereMove };
}
