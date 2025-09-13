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

  console.log(currentUser);

  const CurrentUserUid = currentUser?.uid;

  // const { .
  //   data: user,
  //   isLoading,
  //   error,
  // } = useGetUserTransactionsQuery(CurrentUserUid!, {
  //   skip: !CurrentUserUid,
  // });

  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserTransactions3Query(
    {
      uid: CurrentUserUid as string,
      page: pageNumber,
      limit: 10,
    },
    {
      skip: !CurrentUserUid,
    }
  );

  // console.log(user);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const test = await testData(CurrentUserUid, 2, 10);
  //       console.log(test);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (CurrentUserUid) {
  //     fetchData();
  //   }
  // }, [CurrentUserUid]);

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

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </button>

        <span>Page {pageNumber}</span>

        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={!user || user.total < 10} // disable if fewer than 10 results
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsPage;
