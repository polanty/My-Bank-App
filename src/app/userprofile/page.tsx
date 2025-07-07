"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TransactionsPage from "../components/Transactions/Transactions";

export default function UserProfile() {
  const router = useRouter();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/signin");
    }
  }, [currentUser, router]);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const userTransactions = await getUserTransactions(currentUser?.uid);
  //       console.log(userTransactions);
  //       // Optionally, set it to state
  //       // setTransactions(userTransactions);
  //     } catch (error) {
  //       console.error("Failed to fetch transactions:", error);
  //     }
  //   };

  //   if (currentUser?.uid) {
  //     fetchTransactions();
  //   }
  // }, [currentUser?.uid]);

  //1) Display user profile UI  - availaible balance

  // i) every user should able to send and receive transactions

  // Ui Side bar List
  // Payments and Transfers, Direct debit, Card details, Overdraft, Statements and notices

  //2) Display all the user transactions

  //3) From all my sample Ui's LLyods bank, create all the navigatable routes
  //which includes  1) Card section
  // 2 Direct debit - create , delete, update and read direct debits and also the charges should be made on the date expected.
  // 3 generate pdf of each transactions - debit and credit (receipt) and also a range of date like month

  return (
    <div className="mx-auto max-w-9/10 p-4">
      <h1>Welcome to the User Profile</h1>

      <h1>{currentUser?.displayName}</h1>
      <>
        <TransactionsPage />
      </>
    </div>
  );
}
