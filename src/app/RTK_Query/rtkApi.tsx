import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Jsonplace {
  userId: number;
  id: number;
  name: string;
  completed: boolean;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<Jsonplace[], void>({
      query: () => "users",
    }),
  }),
});

export const { useGetUsersQuery } = api;
