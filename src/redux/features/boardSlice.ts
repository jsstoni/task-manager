import { Tasks } from "@/utils/constant/tasks";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boardService } from "../services";

interface State {
  tasks: Tasks[];
  modalCreate: boolean;
  idTask: number | null;
}

const initialState: State = {
  tasks: [],
  modalCreate: false,
  idTask: null
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleCreate: (state) => {
      state.modalCreate = !state.modalCreate;
    },
    setIdTask: (state, action: PayloadAction<number>) => {
      state.idTask = action.payload
    },
    clean: (state) => {
      state.idTask = null;
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

export const { toggleCreate, setIdTask, clean } = boardSlice.actions

export default boardSlice.reducer;
