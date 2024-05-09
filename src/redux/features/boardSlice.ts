import { Columns, Tasks } from "@/utils/constant/tasks";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boardService } from "../services";

interface State {
  tasks: Tasks[];
  modalCreate: boolean;
  idTask: number | null;
  whereMove: Columns | null;
}

const initialState: State = {
  tasks: [],
  modalCreate: false,
  idTask: null,
  whereMove: null
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleCreate: (state) => {
      state.modalCreate = !state.modalCreate;
    },
    setIdTask: (state, action: PayloadAction<number>) => {
      state.idTask = action.payload;
    },
    setWhereMove: (state, action: PayloadAction<Columns>) => {
      state.whereMove = action.payload;
    },
    clean: (state) => {
      state.idTask = null;
      state.whereMove = null;
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

export const { toggleCreate, setIdTask, setWhereMove, clean } = boardSlice.actions

export default boardSlice.reducer;
