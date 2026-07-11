"use client";

import { useGetUserTransactionsQuery } from "@/app/RTK_Query/authApi";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { generateYearMonthArray } from "@/app/Utilities/utilities";
import UserPDFLib from "@/app/components/UserPDF/UserPDF";

const Statements = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const uid = currentUser?.uid;
  const modelAvailableYears = generateYearMonthArray(
    new Date("2023-01-01")
  ) as Record<string, string[]>;
  const yearKeys = Object.keys(modelAvailableYears).slice(1).reverse();

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserTransactionsQuery(uid as string, {
    skip: !uid,
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
          Documents
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">
          Statements
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Download monthly PDF statements for proof of income, address checks
          or your own records.
        </p>
      </header>

      {isLoading && (
        <div className="rounded-lg border border-stone-200 bg-white p-8 text-center shadow-sm">
          Loading statement archive...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          Error loading statements.
        </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-4">
          {yearKeys.map((year) => (
            <section
              key={year}
              className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-4">
                <h2 className="text-2xl font-semibold text-stone-950">
                  {year}
                </h2>
                <span className="text-sm font-semibold text-stone-500">
                  {modelAvailableYears[year].length} months
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {modelAvailableYears[year].map((month) => (
                  <UserPDFLib
                    user={user}
                    month={month}
                    year={year}
                    key={`${year}-${month}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statements;
