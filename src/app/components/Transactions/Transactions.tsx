"use client";

import {
  useGetUserTransactionsQuery,
  useGetUserTransactions3Query,
} from "@/app/RTK_Query/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState, useEffect } from "react";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { initialstateInterface } from "@/app/reduxSlices/userslice";
import { testData } from "@/app/Firebase/Firebase";

const TransactionsPage = () => {
  const { currentUser } = useSelector(
    (state: RootState): initialstateInterface => state.user
  );

  const CurrentUserUid = currentUser?.uid;

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserTransactionsQuery(CurrentUserUid!, {
    skip: !CurrentUserUid,
  });

  // const [page, setPage] = useState(1);
  // const limit = 10;

  // const userTransactionData = useGetUserTransactions3Query(
  //   CurrentUserUid
  //     ? {
  //         uid: CurrentUserUid, // ✅ use correct key
  //         page,
  //         limit,
  //       }
  //     : skipToken
  // );

  // console.log(userTransactionData);

  //{ data: userTransactionData, isLoading: transactiopnqueryLoading2 }

  useEffect(() => {
    try {
      testData(CurrentUserUid, 1, 10);
    } catch (error) {
      console.log(error);
    }
  }, [CurrentUserUid]);

  if (isLoading)
    return (
      <p className="text-center py-4 text-gray-500">Loading transactions...</p>
    );
  if (error)
    return (
      <p className="text-center py-4 text-red-500">
        Error loading transactions
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-2 text-gray-800">
        Account Number: {user?.accountNumber}
        <span className="ml-2 text-orange-600 font-bold">
          Balance: ₤{user?.Balance}
        </span>
      </h1>

      <h2 className="text-md text-gray-600 mb-4">
        You have been assigned an initial Bonus of:{" "}
        <span className="text-green-600 font-semibold">₤{user?.Bonus}</span>
      </h2>

      <h3 className="text-lg font-medium mb-3 text-gray-700">
        Your Transactions
      </h3>

      {user?.Transactions && user.Transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-4 py-2 text-left">Counterparty</th>
                <th className="px-4 py-2 text-left">Account</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {user.Transactions.map(
                (
                  tx,
                  i //user.Transactions
                ) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">
                      {tx.counterparty}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {tx.counterpartyAccount}
                    </td>
                    <td className="px-4 py-2 text-gray-600 capitalize">
                      {tx.type}
                    </td>
                    <td className="px-4 py-2 text-gray-900 font-medium">
                      ₤{tx.amount.toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">
          You have no transactions
        </p>
      )}
    </div>
  );
};

export default TransactionsPage;
