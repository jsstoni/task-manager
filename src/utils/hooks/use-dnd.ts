import { clean, setIdTask } from "@/redux";
import { useAppDispatch, useBoard } from "@/utils/hooks"

export function useDnD() {
  const dispatch = useAppDispatch();
  const { idTask } = useBoard();

  const onDragStart = (ev: React.DragEvent, id: number) => {
    dispatch(setIdTask(id));
    ev.dataTransfer.effectAllowed = "move";
  }

  const onDragEnd = (ev: React.DragEvent) => {
    ev.preventDefault();
    dispatch(clean());
  }

  const onDrop = (ev: React.DragEvent) => { }

  const onDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
  }

  return { onDragStart, onDragEnd, onDrop, onDragOver, idTask };
}
