import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import boardSlice from "./features/boardSlice";
import timerSlice from "./features/timerSlice";
import { boardService } from "./services";

export const store = configureStore({
  reducer: {
    boardSlice,
    timerSlice,
    [boardService.reducerPath]: boardService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([boardService.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
