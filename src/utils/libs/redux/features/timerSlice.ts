import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  counter: number;
  isStart: boolean;
  taskId: number;
  isStop: boolean;
}

const initialState: State = {
  counter: 0,
  isStart: false,
  taskId: 0,
  isStop: false,
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

    setIsStop: (state, action: PayloadAction<boolean>) => {
      state.isStop = action.payload;
    },
  },
});

export const { setCounter, setIsStart, setTaskId, setIsStop } =
  timerSlice.actions;

export default timerSlice.reducer;
