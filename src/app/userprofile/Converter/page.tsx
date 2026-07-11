"use client";

import CountryForm from "@/app/components/Countries/CountriesList";

const Converter = () => {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
          Currency
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">
          Exchange calculator
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Estimate international spending from GBP using the live exchange-rate
          endpoint configured for this app.
        </p>
      </header>

      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <CountryForm />
      </section>
    </div>
  );
};

export default Converter;
