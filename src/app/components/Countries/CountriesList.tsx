// components/CurrencyConverter.tsx
import { useState } from "react";
import Select from "react-select";
import currencyMap from "country-currency-map";
import { getNames, getCode } from "country-list";
import Image from "next/image";

type OptionType = {
  value: string;
  label: string;
  code: string; // lowercase ISO code for flag
};

type propsType = {
  data: string;
  innerRef: HTMLDivElement | null;
  innerProps: string;
};

// Build options with flag and currency
const options: OptionType[] = getNames()
  .map((name: string) => {
    const code = getCode(name); // ISO Alpha-2
    const currency = code ? currencyMap.get(code)?.currency : null;
    return currency
      ? {
          value: currency,
          label: `${currency} (${name})`,
          code: code.toLowerCase(),
        }
      : null;
  })
  .filter(Boolean) as OptionType[];

const customOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
    >
      <Image
        src={`https://flagcdn.com/w40/${data.code}.png`}
        alt={data.label}
        className="w-5 h-4 rounded-sm"
      />
      <span>{data.label}</span>
    </div>
  );
};

const customSingleValue = ({ data }: any) => (
  <div className="flex items-center gap-2">
    <Image
      src={`https://flagcdn.com/w40/${data.code}.png`}
      alt={data.label}
      className="w-5 h-4 rounded-sm"
    />
    <span>{data.label}</span>
  </div>
);

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<OptionType | null>(null);
  const [toCurrency, setToCurrency] = useState<OptionType | null>(null);
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-sm">From</label>
          <Select
            options={options}
            value={fromCurrency}
            onChange={(val) => setFromCurrency(val)}
            components={{
              Option: customOption,
              SingleValue: customSingleValue,
            }}
            placeholder="From currency"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">To</label>
          <Select
            options={options}
            value={toCurrency}
            onChange={(val) => setToCurrency(val)}
            components={{
              Option: customOption,
              SingleValue: customSingleValue,
            }}
            placeholder="To currency"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter amount"
        />
      </div>

      <div className="pt-2">
        {fromCurrency && toCurrency && (
          <p className="text-gray-700">
            Convert <strong>{amount}</strong> {fromCurrency.value} to{" "}
            {toCurrency.value}
          </p>
        )}
      </div>
    </div>
  );
};
