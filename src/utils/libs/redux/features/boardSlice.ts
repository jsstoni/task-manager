import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Columns, Tasks } from "@/utils/constant/tasks";
import { boardService } from "../services";

interface State {
  tasks: Tasks[];
  isDrag: boolean;
  modalCreate: boolean;
  idTask: number | null;
  whereMove: Columns | null;
  openTask: boolean;
  onlyTask: Tasks | null;
}

const initialState: State = {
  tasks: [],
  isDrag: false,
  modalCreate: false,
  idTask: null,
  whereMove: null,
  openTask: false,
  onlyTask: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<Tasks[]>) => {
      state.tasks = action.payload;
      boardSlice.caseReducers.clean(state);
    },
    openCreate: (state) => {
      state.modalCreate = true;
    },
    closeCreate: (state) => {
      state.modalCreate = false;
    },
    setIdTask: (state, action: PayloadAction<number>) => {
      state.isDrag = true;
      state.idTask = action.payload;
    },
    setWhereMove: (state, action: PayloadAction<Columns>) => {
      state.whereMove = action.payload;
    },
    setOnlyTask: (state, action: PayloadAction<Tasks>) => {
      state.openTask = true;
      state.onlyTask = action.payload;
    },
    closeTask: (state) => {
      state.openTask = false;
    },
    clean: (state) => {
      state.idTask = null;
      state.whereMove = null;
      state.isDrag = false;
    },
  },
  extraReducers: (builder) => {
    // You will get the tasks when you complete the API call
    builder.addMatcher(
      boardService.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload;
      },
    );

    // get the task created after completing
    builder.addMatcher(
      boardService.endpoints.createTask.matchFulfilled,
      (state, { payload }) => {
        state.tasks.push(payload);
      },
    );

    builder.addMatcher(
      boardService.endpoints.addSubtask.matchFulfilled,
      (state, { payload }) => {
        if (state.onlyTask) {
          const id = state.onlyTask.id;
          const index = state.tasks.findIndex((task) => task.id === id);

          if (index !== -1) {
            const newSubtask = [...state.tasks[index].subtask, ...payload];

            state.tasks[index].subtask = newSubtask;
            state.onlyTask.subtask = newSubtask;
          }
        }
      },
    );

    builder.addMatcher(
      boardService.endpoints.rmSubtask.matchFulfilled,
      (state, { payload }) => {
        const idSubtask = payload.tasks_id;
        const index = state.tasks.findIndex((task) => task.id === idSubtask);

        if (index !== -1) {
          const filterSubtask = state.tasks[index].subtask.filter(
            (sub) => sub.id !== payload.id,
          );

          state.tasks[index].subtask = filterSubtask;

          if (state.onlyTask && state.onlyTask.id === idSubtask) {
            state.onlyTask.subtask = filterSubtask;
          }
        }
      },
    );
  },
});

export const {
  updateTasks,
  openCreate,
  closeCreate,
  setIdTask,
  setWhereMove,
  setOnlyTask,
  closeTask,
  clean,
} = boardSlice.actions;

export default boardSlice.reducer;
