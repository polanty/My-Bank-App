"use client";

import Link from "next/link";
import Footer from "@/app/Sections/Footer/Footer";

const values = [
  ["Clarity", "Interfaces and statements should make banking activity easy to understand."],
  ["Control", "Customers should be able to manage cards, payments and records with confidence."],
  ["Care", "Security reminders and transparent journeys should be part of the experience."],
];

const leaders = [
  ["Maya Osei", "Chief Executive Officer"],
  ["Daniel Hart", "Chief Technology Officer"],
  ["Priya Nolan", "Chief Financial Officer"],
  ["Amara Reed", "Head of Customer Experience"],
];

const AboutUs = () => {
  return (
    <>
      <main className="bg-[#f6f3ef]">
        <section className="bg-[#213f29] px-4 py-20 text-white md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff5500]">
                About EGO Bank
              </p>
              <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-none md:text-7xl">
                A fictional digital bank designed around trust and usability.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                EGO Bank is a portfolio banking project focused on secure
                sign-in, clear account dashboards, payment workflows and
                polished statement exports.
              </p>
              <Link
                href="/signInpage"
                className="mt-8 inline-flex rounded-md bg-[#d95600] px-5 py-3 font-semibold text-white no-underline transition hover:bg-[#ff5500]"
              >
                Visit online banking
              </Link>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/8 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#ff5500]">
                Project profile
              </p>
              <dl className="mt-5 grid gap-4">
                {[
                  ["Founded", "2026 portfolio concept"],
                  ["Focus", "Digital retail banking"],
                  ["Core journeys", "Accounts, payments, cards, PDFs"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-6 border-b border-white/12 pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-white/70">{label}</dt>
                    <dd className="text-right font-semibold text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d95600]">
                How we think
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-stone-950 md:text-6xl">
                Banking pages should feel calm, useful and secure.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {values.map(([title, copy]) => (
                <article
                  key={title}
                  className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-semibold text-[#213f29]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg bg-[#213f29] p-6 text-white md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff5500]">
                Leadership
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                Fictional team behind the bank.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Names and roles are illustrative, included to make the About
                page feel like a complete banking website.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {leaders.map(([name, role]) => (
                <article
                  key={name}
                  className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-stone-950">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-[#d95600]">
                    {role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-10">
          <div className="mx-auto max-w-7xl rounded-lg border border-stone-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d95600]">
              Sustainability and responsibility
            </p>
            <h2 className="mt-3 max-w-4xl text-4xl font-semibold text-stone-950 md:text-5xl">
              Built with responsible digital habits in mind.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-stone-600">
              The project highlights security prompts, clear data presentation
              and downloadable customer records, all important patterns for
              trustworthy financial interfaces.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
