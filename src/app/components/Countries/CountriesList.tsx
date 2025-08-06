// components/CountryForm.js
import { useState } from "react";

export const countries = [
  { code: "USD", name: "United States" },
  { code: "GBP", name: "United Kingdom" },
  { code: "NGN", name: "Nigeria" },
  // Add more as needed
];

const CountryForm = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    country1: "USD",
    country2: "GBP",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
          type="text"
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
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Second Input + Country Selector */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <input
          type="text"
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

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CountryForm;
