import type { Tasks } from "@/utils/constant/tasks"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Board = {
  tasks: Tasks[]
}

export const boardService = createApi({
  reducerPath: "board_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    // get tasks from api
    getTasks: builder.query<Board, null>({ query: () => "/board" })
  })
});

export const { useGetTasksQuery } = boardService;