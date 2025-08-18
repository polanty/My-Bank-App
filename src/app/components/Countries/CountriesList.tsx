// components/CountryForm.js
import { useState } from "react";
import { useConvertCurrencyLatestQuery } from "@/app/RTK_Query/Converter";

export const countries = [
  { code: "USD", name: "United States" },
  // { code: "GBP", name: "United Kingdom" },
  { code: "NGN", name: "Nigeria" },
  // Add more as needed
];

const CountryForm = () => {
  const { data, error, isLoading } = useConvertCurrencyLatestQuery({
    base: "GBP",
  });

  const requiredConversionDetails = { ...data };

  const [country1, setCountry1] = useState("GBP");
  const [country2, setCountry2] = useState("USD");

  // field1: requiredConversionDetails?.conversion_rates[country1],
  // field2: requiredConversionDetails?.conversion_rates[country2],

  const [formData, setFormData] = useState({
    field1: parseFloat(country1),
    field2: parseFloat(country2),
    country1: "GBP",
    country2: "USD",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching conversion</p>;

  type FormField = "field1" | "field2" | "country1" | "country2";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as FormField;
    const value = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev };

      // Update field1 if user types a new amount
      if (name === "field1") {
        updated.field1 = parseFloat(value);
      }

      // Update country1 or country2
      if (name === "country1" || name === "country2") {
        updated[name] = value;
      }

      // ✅ Recalculate field2 based on selected countries and input amount
      const conversionRates: Record<string, number> =
        requiredConversionDetails?.conversion_rates ?? {};

      const rateFrom = conversionRates[updated.country1];
      const rateTo = conversionRates[updated.country2];

      if (rateFrom && rateTo && !isNaN(updated.field1)) {
        const convertedAmount = (rateTo / rateFrom) * updated.field1;
        updated.field2 = parseFloat(convertedAmount.toFixed(2));
      }

      return updated;
    });
  };

  console.log(formData);

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        {/* First Input + Country Selector */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="number"
            name="field1"
            placeholder="Field 1"
            value={formData.field1}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
          <select
            name="country1"
            value={formData.country1}
            onChange={handleChange}
          >
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Second Input + Country Selector */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="number"
            name="field2"
            placeholder="Field 2"
            value={formData.field2}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
          <select
            name="country2"
            value={formData.country2}
            onChange={handleChange}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
};

export default CountryForm;
