"use client";

import { useGetUserTransactionsQuery } from "@/app/RTK_Query/authApi";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import UserPDFLib from "@/app/components/UserPDF/UserPDF";

const Statements = () => {
  //Should be able to generate pdf based on their months
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserTransactionsQuery(currentUser?.uid);

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <div>
      <h1>The Statements Page</h1>

      {user && <UserPDFLib user={user} />}
      <h1>{user && new Date(user?.createdAt).getFullYear()}</h1>
    </div>
  );
};

export default Statements;
