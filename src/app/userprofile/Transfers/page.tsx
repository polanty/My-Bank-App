"use client";

import { useState } from "react";
import { useGetUserByAccountNumberQuery } from "@/app/RTK_Query/transferApi";
import {
  addTransactionAndUpdateBalance,
  transferFunds,
} from "@/app/Firebase/Firebase";

const Payments_and_Transfer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [amount, setAmount] = useState("");

  //The main goal is to have a person to be able to search for a user using their account number
  //if user exist then they should be able to submit a transfer request to the user account
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByAccountNumberQuery(submitted, {
    skip: !submitted, // Don’t query until submitted
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(submitted, accountNumber);
    setSubmitted(accountNumber);
  };

  const handleSendButton = async (e: React.FormEvent) => {
    e.preventDefault();

    await transferFunds(
      "wWsN0KnGBcU9A0WkR2n5dvA3zMK2",
      "txVXZHNp2qRxpXHgBQSOqgldmYD2",
      10000
    );
    //Object shape for each transaction
    // {
    //     AccountNumber: 123456789,
    //     AccountName: "Abiola Tijani",
    //     type: "Credit",
    //     amount: 10000,
    //     Date: new Date().toISOString(),
    //   },
    //signed in user : "txVXZHNp2qRxpXHgBQSOqgldmYD2"
    //sending user :  'wWsN0KnGBcU9A0WkR2n5dvA3zMK2'
    //Transaction cannot proceed if the user does not have enough balance
    //if balance is enough user gets a transaction successful message
    console.log("The mount has been sent");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && "status" in error && error.status === 404 && (
        <p>This account number does not exist</p>
      )}

      {error && "status" in error && error.status !== 404 && (
        <p>An unexpected error occurred: {error?.message || "Unknown error"}</p>
      )}
      {user && (
        <>
          <div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
          </div>
          <div>
            <form onSubmit={handleSendButton}>
              <h3>Enter Amount : </h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default Payments_and_Transfer;
