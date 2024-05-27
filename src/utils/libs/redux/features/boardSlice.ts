import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Columns, Expire, Priority, Tasks } from "@/utils/constant/tasks";
import { boardService } from "../services";
import { filterExpire } from "@/utils/time";

interface Filter {
  keyword: string;
  priority: Priority[];
  expire: Expire[];
}

interface State {
  originalTasks: Tasks[];
  tasks: Tasks[];
  isDrag: boolean;
  modalCreate: boolean;
  idTask: number | null;
  whereMove: Columns | null;
  openTask: boolean;
  onlyTask: Tasks | null;
}

const initialState: State = {
  originalTasks: [],
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
    filterTasks: (state, action: PayloadAction<Filter>) => {
      const { keyword, priority, expire } = action.payload;
      state.tasks = state.originalTasks.filter((task) => {
        const matchesKeyword = task.content.includes(keyword);
        const matchesPriority =
          priority.length === 0 ||
          priority.some((p) => task.priority.includes(p));
        const matchesExpire =
          expire.length === 0 ||
          expire.some((exp) => filterExpire(new Date(task.duedate), exp));
        return matchesKeyword && matchesPriority && matchesExpire;
      });
    },
  },
  extraReducers: (builder) => {
    // You will get the tasks when you complete the API call
    builder.addMatcher(
      boardService.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload;
        state.originalTasks = payload;
      },
    );

    // get the task created after completing
    builder.addMatcher(
      boardService.endpoints.createTask.matchFulfilled,
      (state, { payload }) => {
        state.originalTasks.push(payload);
        state.tasks.push(payload);
      },
    );

    //new subtaks
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

    //remove to do
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

    //update to do
    builder.addMatcher(
      boardService.endpoints.putSubtask.matchFulfilled,
      (state, { payload }) => {
        const idSubtask = payload.tasks_id;
        const index = state.tasks.findIndex((task) => task.id === idSubtask);

        if (index !== -1) {
          const filterSubtask = state.tasks[index].subtask
            .filter((sub) => sub.id !== payload.id)
            .concat(payload)
            .sort((a, b) => a.id - b.id);

          state.tasks[index].subtask = filterSubtask;
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
  filterTasks,
} = boardSlice.actions;

export default boardSlice.reducer;
