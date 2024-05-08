import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import boardSlice from "./features/boardSlice";
import { boardService } from "./services";

export const store = configureStore({
  reducer: {
    boardSlice,
    [boardService.reducerPath]: boardService.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([boardService.middleware])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
