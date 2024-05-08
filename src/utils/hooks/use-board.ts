import { useAppSelector } from "./use-redux";

export function useBoard() {
  return useAppSelector(state => state.boardSlice);
}
