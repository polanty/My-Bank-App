// services/currencyApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CurrencyConverterKey = process.env.NEXT_PUBLIC_CURRENCY_CONVERTER;

export interface Latest {
  result?: string;
  time_last_update_utc?: string | { toDate: () => Date }; // Accepts both Firestore Timestamp or ISO string
  base_code?: string;
  amount?: number;
  conversion_rates?: Record<string, number>;
  // conversion_rates: {
  //   string: number;
  // };
}

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://v6.exchangerate-api.com/v6/${CurrencyConverterKey}/`,
  }),
  endpoints: (builder) => ({
    convertCurrency: builder.query<
      { conversion_result: number },
      { from: string; to: string; amount: number }
    >({
      query: ({ from, to, amount }) => `pair/${from}/${to}/${amount}`,
    }),

    convertCurrencyLatest: builder.query<Latest, { base: string }>({
      query: ({ base }) => `latest/${base}/`,
    }),
  }),
});

export const { useConvertCurrencyQuery, useConvertCurrencyLatestQuery } =
  currencyApi;
