import type { Columns, Tasks } from "@/utils/constant/tasks"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardService = createApi({
  reducerPath: "board_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    // get tasks from api
    getTasks: builder.query<Tasks[], null>({ query: () => "/board" }),

    // post tasks from api
    createTask: builder.mutation<Tasks, Partial<Tasks>>({
      query: (created) => ({ url: "/board", method: "POST", body: created }),
    }),

    //put tasks from api
    setColumn: builder.mutation<Tasks, { id: number, column: Columns }>({
      query: (updated) => ({ url: "/board", method: "PUT", body: updated }),
    }),
  })
});

export const { useGetTasksQuery, useCreateTaskMutation, useSetColumnMutation } = boardService;
