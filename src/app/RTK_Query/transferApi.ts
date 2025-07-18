import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserByAccountNumber } from "../Firebase/Firebase";
import { initialUserData } from "./authApi";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Not used here but required
  endpoints: (builder) => ({
    getUserByAccountNumber: builder.query<initialUserData | null, string>({
      async queryFn(accountNumber: string) {
        try {
          const userDetails = await getUserByAccountNumber(accountNumber);
          console.log(userDetails);
          if (!userDetails) {
            return {
              error: {
                status: 404,
                message: "User not found",
              },
            };
          }

          return { data: userDetails }; // ✅ THIS is what was missing
        } catch (error: any) {
          return { error: { status: "FETCH_ERROR", message: error.message } };
        }
      },
    }),
  }),
});

export const { useGetUserByAccountNumberQuery } = transactionApi;
