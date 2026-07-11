import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserByAccountNumber } from "../Firebase/Firebase";
import { initialUserData } from "./authApi";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "An unexpected error occurred";

const normalizeAccount = (
  user: Partial<initialUserData>,
  uid: string
): initialUserData => ({
  uid,
  displayName: user.displayName ?? "",
  email: user.email ?? "",
  accountNumber: user.accountNumber ?? "",
  createdAt: user.createdAt ?? new Date().toISOString(),
  Transactions: user.Transactions ?? [],
  isactive: user.isactive ?? true,
  Bonus: user.Bonus ?? 0,
  Balance: user.Balance ?? 0,
});

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUserByAccountNumber: builder.query<initialUserData | null, string>({
      async queryFn(accountNumber: string) {
        try {
          const userDetails = await getUserByAccountNumber(accountNumber);

          if (!userDetails) {
            return {
              error: {
                status: 404,
                data: { message: "User not found" },
              },
            };
          }

          return {
            data: normalizeAccount(userDetails, userDetails.uid ?? ""),
          };
        } catch (error: unknown) {
          return {
            error: { status: "FETCH_ERROR", error: getErrorMessage(error) },
          };
        }
      },
    }),
  }),
});

export const { useGetUserByAccountNumberQuery } = transactionApi;
