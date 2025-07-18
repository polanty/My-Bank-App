"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetUserByAccountNumberQuery } from "@/app/RTK_Query/transferApi";
import { transferFunds } from "@/app/Firebase/Firebase";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Payments_and_Transfer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [amount, setAmount] = useState("");

  //Get the current user
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
    const senderUid = currentUser && currentUser.uid;
    const receiverUid = user && user.uid;

    console.log(senderUid, receiverUid, user);

    await transferFunds(senderUid, receiverUid, amount);
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
            <>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </>
          </div>
        </>
      )}
    </div>
  );
};
export default Payments_and_Transfer;
