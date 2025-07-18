"use client";
//Current user functionality
import { useGetUserTransactionsQuery } from "@/app/RTK_Query/authApi";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

//Pdf functionality
//import { statementYears } from "@/app/components/statementYears/statement";
import { generateYearMonthArray } from "@/app/Utilities/utilities";
import UserPDFLib from "@/app/components/UserPDF/UserPDF";

const Statements = () => {
  //Should be able to generate pdf based on their months
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // Only assign if UID exists
  const uid = currentUser?.uid;

  const modelAvaialaibleYears = generateYearMonthArray(new Date("2023-01-01"));

  const newYear: Record<string, string[]> = {
    ...modelAvaialaibleYears,
  };

  const yearsKeys: string[] = Object.keys(newYear).slice(1).reverse();
  // end of the array that generates the months based on the number of years

  //Now I have to create a function that Onclick of any month
  //send the month into the new user object(Cloned from the current user)
  //filter out only the current month from the transactions and print out the Pdf
  const transactions = [
    // You can start with an empty array [] or some initial objects
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-01-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-01-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-01-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-02-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-02-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-02-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Mike",
      type: "debit",
      amount: 6000,
      Date: new Date("2023-03-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Daniel",
      type: "debit",
      amount: 800,
      Date: new Date("2023-03-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-03-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Onyinye",
      type: "debit",
      amount: 900,
      Date: new Date("2023-03-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-03-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Muyiwa",
      type: "debit",
      amount: 700,
      Date: new Date("2023-03-04").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-04-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Daniel",
      type: "debit",
      amount: 400,
      Date: new Date("2023-04-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-04-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-04-01").toISOString(),
      description: "",
    },
    {
      AccountNumber: 123456789,
      AccountName: "Abiola Tijani",
      type: "Credit",
      amount: 10000,
      Date: new Date("2023-05-01").toISOString(),
      description: "",
    },
  ];

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserTransactionsQuery(uid as string, {
    skip: !uid, // Don’t query until submitted
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <div>
      <h1>The Statements Page</h1>

      {user && <UserPDFLib user={user} />}
      <h1>{user && new Date(user?.createdAt).getFullYear()}</h1>
      {yearsKeys.map((yearObj, ind) => {
        return (
          <div key={ind}>
            <h3>{yearObj}</h3>
            <div>
              {newYear[yearObj].map((month, ind) => {
                return <p key={ind}>{month}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Statements;
