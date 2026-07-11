"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetUserByAccountNumberQuery } from "@/app/RTK_Query/transferApi";
import { transferFunds } from "@/app/Firebase/Firebase";

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unable to complete this transfer.";

const PaymentsAndTransfer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByAccountNumberQuery(submitted, {
    skip: !submitted,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitted(accountNumber.trim());
  };

  const handleSendButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const numericAmount = Number(amount);
    if (!currentUser?.uid || !user?.uid) {
      setMessage("Choose a valid recipient before sending.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessage("Enter an amount greater than zero.");
      return;
    }

    try {
      setIsSending(true);
      await transferFunds(
        currentUser.uid,
        user.uid,
        numericAmount.toString(),
        reference || `Transfer to ${user.displayName}`
      );
      setMessage(`Payment of ${money.format(numericAmount)} sent.`);
      setAmount("");
      setReference("");
    } catch (err: unknown) {
      setMessage(getErrorMessage(err));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
          Payments
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">
          Send money
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Search by EGO Bank account number, confirm the recipient and submit a
          secure internal transfer.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">
            Find recipient
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-stone-700">
                Account number
              </span>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="1000000001"
                className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950 focus:border-[#d95600]"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-md bg-[#213f29] px-4 py-3 font-semibold text-white"
            >
              Search account
            </button>
          </form>

          {isLoading && (
            <p className="mt-4 rounded-md bg-stone-50 p-3 text-sm text-stone-600">
              Searching for this account...
            </p>
          )}
          {error && "status" in error && error.status === 404 && (
            <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              This account number does not exist.
            </p>
          )}
          {error && "status" in error && error.status !== 404 && (
            <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              An unexpected error occurred.
            </p>
          )}
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">
            Payment details
          </h2>

          {user ? (
            <form onSubmit={handleSendButton} className="mt-5 space-y-4">
              <div className="rounded-lg bg-[#f6f3ef] p-4">
                <p className="text-sm text-stone-500">Recipient</p>
                <p className="mt-1 text-2xl font-semibold text-stone-950">
                  {user.displayName}
                </p>
                <p className="text-sm text-stone-600">
                  {user.email} / {user.accountNumber}
                </p>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-stone-700">
                  Amount
                </span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950 focus:border-[#d95600]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-stone-700">
                  Reference
                </span>
                <textarea
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Dinner, rent, invoice..."
                  rows={4}
                  className="mt-2 w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950 focus:border-[#d95600]"
                />
              </label>

              {message && (
                <p className="rounded-md bg-stone-50 p-3 text-sm font-semibold text-stone-700">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-md bg-[#d95600] px-4 py-3 font-semibold text-white disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Send payment"}
              </button>
            </form>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-600">
              Recipient details will appear here after a successful search.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PaymentsAndTransfer;
