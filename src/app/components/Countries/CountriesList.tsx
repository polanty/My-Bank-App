"use client";

import { useEffect, useState } from "react";
import { useConvertCurrencyLatestQuery } from "@/app/RTK_Query/Converter";

export const countries = [
  { code: "USD", name: "United States dollar" },
  { code: "AUD", name: "Australian dollar" },
  { code: "EUR", name: "Euro" },
  { code: "CHF", name: "Swiss franc" },
  { code: "NGN", name: "Nigerian naira" },
];

const CountryForm = () => {
  const { data, error, isLoading } = useConvertCurrencyLatestQuery({
    base: "GBP",
  });
  const [amount, setAmount] = useState(100);
  const [target, setTarget] = useState("USD");

  const rate = data?.conversion_rates?.[target] ?? 0;
  const converted = rate * amount;
  const lastUpdated =
    typeof data?.time_last_update_utc === "string"
      ? data.time_last_update_utc
      : "Not supplied";

  useEffect(() => {
    if (!data?.conversion_rates?.[target]) {
      setTarget("USD");
    }
  }, [data, target]);

  if (isLoading) {
    return <p className="text-stone-600">Loading exchange rates...</p>;
  }

  if (error || !data?.conversion_rates) {
    return (
      <p className="rounded-md bg-red-50 p-4 text-red-700">
        Error fetching conversion rates. Check your currency API key and try
        again.
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <form className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-stone-700">
            Amount in GBP
          </span>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-stone-700">
            Convert to
          </span>
          <select
            name="country2"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code} - {country.name}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="rounded-lg bg-[#213f29] p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#faebbb]">
          Estimated value
        </p>
        <p className="mt-4 text-4xl font-semibold">
          {target}{" "}
          {converted.toLocaleString("en-GB", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </p>
        <p className="mt-4 text-sm text-white/70">
          1 GBP = {rate.toFixed(4)} {target}
        </p>
        <p className="mt-1 text-xs text-white/60">
          Last updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default CountryForm;
