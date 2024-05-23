import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  counter: number;
  isStart: boolean;
  taskId: number;
}

const initialState: State = {
  counter: 0,
  isStart: false,
  taskId: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },

    setIsStart: (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload;
    },

    setTaskId: (state, action: PayloadAction<number>) => {
      state.taskId = action.payload;
    },
  },
});

export const { setCounter, setIsStart, setTaskId } = timerSlice.actions;

export default timerSlice.reducer;
