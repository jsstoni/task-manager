import { clean, setIdTask, setWhereMove } from "@/redux";
import { useAppDispatch, useBoard } from "@/utils/hooks"
import { Columns } from "../constant/tasks";

export function useDnD() {
  const dispatch = useAppDispatch();
  const { idTask, whereMove } = useBoard();

  const onDragStart = (ev: React.DragEvent, id: number) => {
    dispatch(setIdTask(id));
    ev.dataTransfer.effectAllowed = "move";
  }

  const onDragEnd = (ev: React.DragEvent) => {
    ev.preventDefault();
    dispatch(clean());
  }

  const onDrop = (ev: React.DragEvent) => { }

  const onDragOver = (ev: React.DragEvent, column: Columns) => {
    dispatch(setWhereMove(column));
    ev.preventDefault();
  }

  return { onDragStart, onDragEnd, onDrop, onDragOver, idTask, whereMove };
}
