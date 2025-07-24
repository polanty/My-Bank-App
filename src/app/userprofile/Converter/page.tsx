"use client";

import { useConvertCurrencyQuery } from "@/app/RTK_Query/Converter";
import { CurrencyConverter } from "@/app/components/Countries/CountriesList";

const Converter = () => {
  const { data, error, isLoading } = useConvertCurrencyQuery({
    from: "USD",
    to: "GBP",
    amount: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching conversion</p>;

  return (
    <div>
      <h1>The Api to check currency conversion rates</h1>
      <p>Converted Amount: {data?.conversion_result}</p>

      {/* <CurrencyConverter /> */}
    </div>
  );
};

export default Converter;
