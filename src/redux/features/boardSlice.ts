import { Columns, Tasks } from "@/utils/constant/tasks";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boardService } from "../services";

interface State {
  tasks: Tasks[];
  modalCreate: boolean;
  idTask: number | null;
  whereMove: Columns | null;
  openTask: boolean;
  singleTask: Tasks | null;
}

const initialState: State = {
  tasks: [],
  modalCreate: false,
  idTask: null,
  whereMove: null,
  openTask: false,
  singleTask: null
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<Tasks[]>) => {
      state.tasks = action.payload;
      boardSlice.caseReducers.clean(state);
    },
    toggleCreate: (state) => {
      state.modalCreate = !state.modalCreate;
    },
    setIdTask: (state, action: PayloadAction<number>) => {
      state.idTask = action.payload;
    },
    setWhereMove: (state, action: PayloadAction<Columns>) => {
      state.whereMove = action.payload;
    },
    setSingleTask: (state, action: PayloadAction<Tasks>) => {
      state.openTask = true;
      state.singleTask = action.payload;
    },
    closeTask: (state) => {
      state.openTask = false;
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

export const { updateTasks, toggleCreate, setIdTask, setWhereMove, setSingleTask, closeTask, clean } = boardSlice.actions

export default boardSlice.reducer;
