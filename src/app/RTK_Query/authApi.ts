// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createNewUserWithData,
  signInUserUsingEmailandPassword,
  getUserTransactions,
  getUserTransactions3,
} from "../Firebase/Firebase";

//Transaction Object interface
// src/types/index.ts or src/types/transactions.ts
export interface transacs {
  counterparty: string;
  Date: string | { toDate: () => Date }; // Accepts both Firestore Timestamp or ISO string
  description: string;
  amount: number;
  type: "credit" | "debit";
  counterpartyAccount: string;
}

export interface initialUserData {
  uid: string;
  displayName: string;
  email: string; // You might store email here for easy lookup, but Auth is source of truth
  accountNumber: string;
  createdAt: Date; // Timestamp of creation
  // Here's your array to hold other objects!
  Transactions: transacs[];

  isactive: boolean;
  Bonus: number;
  Balance: number;
  // ... other user-specific fields you need
}

// Define your input type
type PaginationRequest = {
  uid: string;
  page: number;
  limit: number;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    //Sign Up mutations
    signup: builder.mutation<
      {
        uid: string;
        email: string;
        displayName: string;
        isactive: boolean;
      },
      { email: string; password: string; displayName: string }
    >({
      async queryFn({ email, password, displayName }) {
        try {
          const user = await createNewUserWithData(
            email,
            password,
            displayName
          );
          return {
            data: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              isactive: user.isactive,
            },
          };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),

    //Sign In mutations
    signin: builder.mutation<
      { uid: string; email: string; displayName: string; isactive: boolean },
      { email: string; password: string }
    >({
      async queryFn({ email, password }) {
        try {
          const user = await signInUserUsingEmailandPassword(email, password);

          return {
            data: {
              uid: user?.uid,
              email: user?.email,
              displayName: user?.displayName,
              isactive: user?.isactive,
            },
          };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),

    //Get User transactions
    getUserTransactions: builder.query<initialUserData, string>({
      queryFn: async (uid) => {
        try {
          const user = await getUserTransactions(uid); // your async Firestore fetch
          return { data: user };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    getUserTransactions3: builder.query<
      { transactions: transacs[]; total: number },
      { uid: string; page: number; limit: number }
    >({
      queryFn: async ({ uid, page, limit }) => {
        try {
          const user = await getUserTransactions3(uid, page, limit); // Updated to handle pagination
          return { data: user };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetUserTransactionsQuery,
  useGetUserTransactions3Query,
} = authApi;
