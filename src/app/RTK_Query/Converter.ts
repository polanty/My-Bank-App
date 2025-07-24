// services/currencyApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CurrencyConverterKey = process.env.NEXT_PUBLIC_CURRENCY_CONVERTER;

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
  }),
});

export const { useConvertCurrencyQuery } = currencyApi;
