"use client";
import { useState } from "react";
import {
  useConvertCurrencyQuery,
  useConvertCurrencyLatestQuery,
} from "@/app/RTK_Query/Converter";
import CountryForm from "@/app/components/Countries/CountriesList";

export const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "NG", name: "Nigeria" },
  // Add more as needed
];

const Converter = () => {
  // const [currency, setCurrency] = useState("USD");

  // const { data, error, isLoading } = useConvertCurrencyQuery({
  //   from: currency,
  //   to: "GBP",
  //   amount: 1000,
  // });

  const { data, error, isLoading } = useConvertCurrencyLatestQuery({
    base: "GBP",
  });

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching conversion</p>;

  return (
    <div>
      <h1>The Api to check currency conversion rates</h1>
      <div>
        <CountryForm />
      </div>
    </div>
  );
};

export default Converter;
