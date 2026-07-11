"use client";

import {
  transacs,
  useGetUserTransactions3Query,
  useGetUserTransactionsQuery,
} from "@/app/RTK_Query/authApi";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function formatDate(value: transacs["Date"]) {
  const date = typeof value === "string" ? new Date(value) : value.toDate();
  return Number.isNaN(date.getTime())
    ? "Pending"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

const TransactionsPage = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const uid = currentUser?.uid;
  const [pageNumber, setPageNumber] = useState(1);

  const { data: account, isLoading: accountLoading } =
    useGetUserTransactionsQuery(uid as string, {
      skip: !uid,
    });

  const {
    data: page,
    isLoading: transactionsLoading,
    error,
  } = useGetUserTransactions3Query(
    {
      uid: uid as string,
      page: pageNumber,
      limit: 10,
    },
    {
      skip: !uid,
    }
  );

  if (accountLoading || transactionsLoading) {
    return (
      <div className="rounded-lg border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-stone-200 border-t-[#d95600]" />
        <p className="font-semibold text-stone-700">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        Error loading transactions. Please refresh and try again.
      </div>
    );
  }

  const transactions = page?.Transactions ?? [];
  const total = page?.total ?? 0;
  const canGoNext = pageNumber * 10 < total;

  return (
    <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
      <div className="grid gap-4 border-b border-stone-200 p-5 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Balance
          </p>
          <p className="mt-1 text-3xl font-semibold text-stone-950">
            {money.format(account?.Balance ?? 0)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Account number
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {account?.accountNumber ?? "Pending"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Opening bonus
          </p>
          <p className="mt-2 text-lg font-semibold text-[#213f29]">
            {money.format(account?.Bonus ?? 0)}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-stone-950">
              Recent transactions
            </h2>
            <p className="text-sm text-stone-600">
              {total} account movement{total === 1 ? "" : "s"} recorded.
            </p>
          </div>
          <p className="text-sm font-semibold text-stone-500">
            Page {pageNumber}
          </p>
        </div>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-y border-stone-200 bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Counterparty</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {transactions.map((tx, i) => {
                  const isCredit = tx.type?.toLowerCase() === "credit";

                  return (
                    <tr key={`${tx.Date}-${i}`} className="hover:bg-stone-50">
                      <td className="whitespace-nowrap px-4 py-4 text-stone-600">
                        {formatDate(tx.Date)}
                      </td>
                      <td className="px-4 py-4 font-semibold text-stone-900">
                        {tx.counterparty || "EGO Bank"}
                      </td>
                      <td className="px-4 py-4 text-stone-600">
                        {tx.description || tx.counterpartyAccount || "Transfer"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isCredit
                              ? "bg-green-50 text-green-700"
                              : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {isCredit ? "Credit" : "Debit"}
                        </span>
                      </td>
                      <td
                        className={`whitespace-nowrap px-4 py-4 text-right font-semibold ${
                          isCredit ? "text-green-700" : "text-stone-950"
                        }`}
                      >
                        {isCredit ? "+" : "-"}
                        {money.format(Math.abs(tx.amount ?? 0))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-600">
            You have no transactions yet.
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
            className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={!canGoNext}
            className="rounded-md bg-[#213f29] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
