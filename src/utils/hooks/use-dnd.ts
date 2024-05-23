import {
  clean,
  setIdTask,
  setWhereMove,
  updateTasks,
  useSetColumnMutation,
} from "@/utils/libs/redux";
import { useAppDispatch, useAppSelector, useBoard } from "@/utils/hooks";
import { Columns } from "../constant/tasks";

export function useDnD() {
  const dispatch = useAppDispatch();
  const { taskId, counter } = useAppSelector((state) => state.timerSlice);
  const { idTask, whereMove, tasks, isDrag } = useBoard();

  const [updateColumn] = useSetColumnMutation();

  const onDragStart = (ev: React.DragEvent, id: number) => {
    dispatch(setIdTask(id));
    ev.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (ev: React.DragEvent) => {
    ev.preventDefault();
    dispatch(clean());
  };

  const onDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    const taskIndex = tasks.findIndex((task) => task.id === idTask);
    let selectedTask = { ...tasks[taskIndex] };

    if (!isDrag || !whereMove || selectedTask.column === whereMove) {
      return;
    }

    if (taskId === idTask && counter > 0) {
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
  };

  const onDragOver = (ev: React.DragEvent, column: Columns) => {
    ev.preventDefault();
    if (isDrag) {
      dispatch(setWhereMove(column));
    }
  };

  return { onDragStart, onDragEnd, onDrop, onDragOver, idTask, whereMove };
}
