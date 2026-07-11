"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserTransactionsQuery } from "../RTK_Query/authApi";
import TransactionsPage from "../components/Transactions/Transactions";

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function UserProfile() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { data: account } = useGetUserTransactionsQuery(
    currentUser?.uid as string,
    {
      skip: !currentUser?.uid,
    }
  );

  const quickActions = [
    { href: "/userprofile/Transfers", label: "Make a payment" },
    { href: "/userprofile/Statements", label: "Download statements" },
    { href: "/userprofile/Card", label: "Manage card" },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-[#213f29] text-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#faebbb]">
              Current account
            </p>
            <h1 className="mt-3 text-4xl font-semibold">
              Welcome back, {currentUser?.displayName || "there"}
            </h1>
            <p className="mt-3 max-w-2xl text-white/80">
              View your balance, send money, manage card settings and download
              monthly statements from your secure workspace.
            </p>
          </div>
          <div className="rounded-lg bg-white/10 p-5">
            <p className="text-sm text-white/70">Available balance</p>
            <p className="mt-2 text-4xl font-semibold">
              {money.format(account?.Balance ?? 0)}
            </p>
            <p className="mt-4 text-sm text-white/70">
              Account {account?.accountNumber ?? "pending"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            href={action.href}
            key={action.href}
            className="rounded-lg border border-stone-200 bg-white p-5 text-stone-950 shadow-sm transition hover:-translate-y-0.5 hover:border-[#d95600]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d95600]">
              Action
            </p>
            <h2 className="mt-3 text-xl font-semibold">{action.label}</h2>
          </Link>
        ))}
      </section>

      <TransactionsPage />
    </div>
  );
}
