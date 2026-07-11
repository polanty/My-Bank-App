"use client";

import { useMemo, useState } from "react";

type Mandate = {
  id: number;
  name: string;
  amount: string;
  date: string;
  status: "Active" | "Paused";
};

const starterMandates: Mandate[] = [
  { id: 1, name: "Home broadband", amount: "39.99", date: "2026-08-01", status: "Active" },
  { id: 2, name: "Gym membership", amount: "24.00", date: "2026-08-12", status: "Paused" },
];

const DirectDebit = () => {
  const [mandates, setMandates] = useState<Mandate[]>(starterMandates);
  const [form, setForm] = useState({ name: "", amount: "", date: "" });

  const nextTotal = useMemo(
    () =>
      mandates
        .filter((mandate) => mandate.status === "Active")
        .reduce((sum, mandate) => sum + Number(mandate.amount || 0), 0),
    [mandates]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.amount || !form.date) return;

    setMandates((current) => [
      {
        id: Date.now(),
        name: form.name,
        amount: form.amount,
        date: form.date,
        status: "Active",
      },
      ...current,
    ]);
    setForm({ name: "", amount: "", date: "" });
  };

  const toggleStatus = (id: number) => {
    setMandates((current) =>
      current.map((mandate) =>
        mandate.id === id
          ? {
              ...mandate,
              status: mandate.status === "Active" ? "Paused" : "Active",
            }
          : mandate
      )
    );
  };

  const removeMandate = (id: number) => {
    setMandates((current) => current.filter((mandate) => mandate.id !== id));
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
          Regular payments
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">
          Direct debits
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Create and manage scheduled payment instructions for recurring bills.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-stone-950">
            New instruction
          </h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-stone-700">
                Payment name
              </span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3"
                placeholder="Energy supplier"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-stone-700">
                Amount
              </span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3"
                placeholder="0.00"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-stone-700">
                Next payment date
              </span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3"
              />
            </label>
            <button className="w-full rounded-md bg-[#213f29] px-4 py-3 font-semibold text-white">
              Add direct debit
            </button>
          </div>
        </form>

        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-2 border-b border-stone-200 pb-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold text-stone-950">
                Active instructions
              </h2>
              <p className="text-sm text-stone-600">
                Estimated active monthly total: GBP {nextTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {mandates.map((mandate) => (
              <article
                key={mandate.id}
                className="rounded-lg border border-stone-200 p-4"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-semibold text-stone-950">
                      {mandate.name}
                    </h3>
                    <p className="text-sm text-stone-600">
                      GBP {Number(mandate.amount).toFixed(2)} due{" "}
                      {new Date(mandate.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleStatus(mandate.id)}
                      className="rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold"
                    >
                      {mandate.status}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMandate(mandate.id)}
                      className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectDebit;
