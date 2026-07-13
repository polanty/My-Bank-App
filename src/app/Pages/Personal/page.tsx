"use client";

import Link from "next/link";
import Footer from "@/app/Sections/Footer/Footer";

const accounts = [
  {
    title: "EGO Flex Current",
    description:
      "A day-to-day account for spending, transfers and statement downloads from one secure workspace.",
    details: ["No monthly account fee", "Instant EGO-to-EGO transfers", "Virtual card controls"],
  },
  {
    title: "EGO Kids Start",
    description:
      "A fictional junior account with simple spending limits, parent visibility and savings goals.",
    details: ["Age 11 to 17", "Spending caps", "Goal pockets"],
  },
  {
    title: "EGO Saver Reserve",
    description:
      "A savings space for emergency funds, planned purchases and simple interest projections.",
    details: ["Same-day access", "Five goal pots", "Projected 4.10% AER"],
  },
];

const tools = [
  ["Card controls", "Freeze, reveal and review card settings in the secure account area."],
  ["Statements", "Download monthly PDF statements with aligned account and transaction details."],
  ["Payments", "Search by account number and send internal transfers with a payment reference."],
];

const Personal = () => {
  return (
    <>
      <main className="bg-[#f6f3ef]">
        <section className="bg-[#213f29] px-4 py-20 text-white md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff5500]">
                Personal banking
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-none md:text-7xl">
                Everyday accounts built around clear digital banking.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                Manage fictional balances, cards, statements and payments with
                the same calm visual system used across the EGO Bank homepage.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signInpage"
                  className="rounded-md bg-[#d95600] px-5 py-3 font-semibold text-white no-underline transition hover:bg-[#ff5500]"
                >
                  Log on
                </Link>
                <Link
                  href="/Pages/About"
                  className="rounded-md border border-white/35 px-5 py-3 font-semibold text-white no-underline transition hover:border-[#ff5500] hover:text-[#ff5500]"
                >
                  Learn more
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/8 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#ff5500]">
                Account snapshot
              </p>
              <div className="mt-5 grid gap-4">
                {[
                  ["Opening bonus", "GBP 50,000"],
                  ["Internal transfer speed", "Instant"],
                  ["Statement format", "PDF"],
                ].map(([label, value]) => (
                  <div
                    className="flex items-center justify-between border-b border-white/12 pb-4 last:border-b-0 last:pb-0"
                    key={label}
                  >
                    <span className="text-white/70">{label}</span>
                    <strong className="text-right text-white">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d95600]">
                Choose your account
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-stone-950 md:text-6xl">
                Personal products for different stages.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {accounts.map((account) => (
                <article
                  key={account.title}
                  className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-semibold text-stone-950">
                    {account.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {account.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {account.details.map((detail) => (
                      <li
                        className="border-t border-stone-100 pt-3 text-sm font-semibold text-[#213f29]"
                        key={detail}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 rounded-lg bg-white p-6 shadow-sm lg:grid-cols-3">
            {tools.map(([title, description]) => (
              <div key={title}>
                <h3 className="text-xl font-semibold text-stone-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Personal;
