"use client";

import Link from "next/link";
import Footer from "@/app/Sections/Footer/Footer";

const services = [
  {
    title: "Business Flow Account",
    copy: "Separate operating cash, supplier payments and statement records for a fictional growing company.",
  },
  {
    title: "Payment Controls",
    copy: "Search internal recipients, add references and keep payment history visible in the secure dashboard.",
  },
  {
    title: "Statement Exports",
    copy: "Download month-by-month PDF statements for bookkeeping, reconciliation and proof of activity.",
  },
  {
    title: "Currency View",
    copy: "Estimate international spending from GBP with the currency converter inside online banking.",
  },
];

const sectors = ["Retail", "Consulting", "Digital services", "Property", "Hospitality", "Creative teams"];

const Business = () => {
  return (
    <>
      <main className="bg-[#f6f3ef]">
        <section className="bg-[#213f29] px-4 py-20 text-white md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff5500]">
              Business banking
            </p>
            <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-none md:text-7xl">
              Banking tools for fictional teams that need clear cash movement.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
              EGO Business Flow brings payments, statements, balances and card
              visibility into a single workspace for this portfolio banking
              project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signInpage"
                className="rounded-md bg-[#d95600] px-5 py-3 font-semibold text-white no-underline transition hover:bg-[#ff5500]"
              >
                Log on to business banking
              </Link>
              <Link
                href="/Pages/About"
                className="rounded-md border border-white/35 px-5 py-3 font-semibold text-white no-underline transition hover:border-[#ff5500] hover:text-[#ff5500]"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d95600]">
                What we offer
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-stone-950 md:text-6xl">
                Practical features for everyday operations.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">
                Built to demonstrate the types of tasks business customers
                expect from modern online banking.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-semibold text-stone-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {service.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-10">
          <div className="mx-auto max-w-7xl rounded-lg bg-[#213f29] p-6 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff5500]">
                  Business sectors
                </p>
                <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                  Designed for a wide set of fictional businesses.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {sectors.map((sector) => (
                  <div
                    key={sector}
                    className="rounded-md border border-white/15 px-4 py-3 font-semibold text-white/85"
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Business;
