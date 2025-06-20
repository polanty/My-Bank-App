// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInUserUsingEmailandPassword } from "../Firebase/Firebase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    //Sign Up mutations
    signup: builder.mutation<
      { uid: string; email: string },
      { email: string; password: string; displayName: string }
    >({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),

    //Sign In mutations
    signin: builder.mutation<
      { uid: string; email: string; displayName: string },
      { email: string; password: string }
    >({
      async queryFn({ email, password }) {
        try {
          const user = await signInUserUsingEmailandPassword(email, password);
          return { data: user };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
