import { Tasks } from "@/utils/constant/tasks";
import { createSlice } from "@reduxjs/toolkit";
import { boardService } from "../services";

interface State {
  tasks: Tasks[];
  modalCreate: boolean;
}

const initialState: State = {
  tasks: [],
  modalCreate: false
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleCreate: (state) => {
      state.modalCreate = !state.modalCreate;
    }
  },
  extraReducers: (builder) => {
    // You will get the tasks when you complete the API call
    builder.addMatcher(
      boardService.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload
      }
    );

    // get the task created after completing
    builder.addMatcher(
      boardService.endpoints.createTask.matchFulfilled,
      (state, { payload }) => {
        state.tasks.push(payload);
      },
    );
  }
});

export const { toggleCreate } = boardSlice.actions

export default boardSlice.reducer;
