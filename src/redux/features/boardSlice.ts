import { Tasks } from "@/utils/constant/tasks";
import { createSlice } from "@reduxjs/toolkit";
import { boardService } from "../services";

interface State {
  tasks: Tasks[];
}

const initialState: State = {
  tasks: []
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // You will get the tasks when you complete the API call
    builder.addMatcher(
      boardService.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload.tasks
      }
    );
  }
});

export const { } = boardSlice.actions

export default boardSlice.reducer;
