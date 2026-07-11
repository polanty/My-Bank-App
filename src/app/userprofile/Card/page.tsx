"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetUserTransactionsQuery } from "@/app/RTK_Query/authApi";

const CardPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [cardFrozen, setCardFrozen] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { data: account } = useGetUserTransactionsQuery(
    currentUser?.uid as string,
    {
      skip: !currentUser?.uid,
    }
  );

  const lastFour = account?.accountNumber?.slice(-4) ?? "0000";

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
          Card
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">
          Card controls
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Review your virtual debit card and manage everyday security settings.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="relative aspect-[1.58/1] overflow-hidden rounded-lg bg-[#213f29] p-6 text-white shadow-xl">
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">EGO Bank</p>
                <p className="text-sm uppercase tracking-[0.2em]">Debit</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-[0.18em]">
                  {showDetails
                    ? `4929 2000 ${lastFour.padStart(4, "0")} 8842`
                    : "4929 2000 **** ****"}
                </p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase text-white/60">
                      Card holder
                    </p>
                    <p className="font-semibold">
                      {currentUser?.displayName || "Account holder"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase text-white/60">CVV</p>
                    <p className="font-semibold">
                      {showDetails ? "318" : "***"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails((value) => !value)}
            className="mt-5 w-full rounded-md bg-[#d95600] px-4 py-3 font-semibold text-white"
          >
            {showDetails ? "Hide card details" : "Reveal card details"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-stone-950">
                  Freeze card
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  Temporarily block card transactions while you check activity.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCardFrozen((value) => !value)}
                className={`rounded-md px-4 py-2 text-sm font-semibold ${
                  cardFrozen
                    ? "bg-blue-50 text-blue-700"
                    : "bg-[#213f29] text-white"
                }`}
              >
                {cardFrozen ? "Unfreeze" : "Freeze"}
              </button>
            </div>
          </div>

          {[
            ["Online payments", "Enabled"],
            ["Contactless", cardFrozen ? "Paused" : "Enabled"],
            ["ATM withdrawals", "Enabled"],
            ["Overseas use", "Off"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
            >
              <span className="font-semibold text-stone-900">{label}</span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-700">
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CardPage;
