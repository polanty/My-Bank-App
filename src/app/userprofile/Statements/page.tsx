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

  const modelAvaialaibleYears = generateYearMonthArray(new Date("2023-01-01")); //For testing purposes , Ideally will be the created date of the user account

  const newYear: Record<string, string[]> = {
    ...modelAvaialaibleYears,
  };

  const yearsKeys: string[] = Object.keys(newYear).slice(1).reverse();
  // end of the array that generates the months based on the number of years

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

      <h1>DownLoad or print statement online</h1>

      <p>
        Whether you need to prove who you are, your address or your income, the
        quickest way could be to download a summary of your transactions. You
        can then save, email or print it from your device.
      </p>
      {yearsKeys.map((yearObj, ind) => {
        //Now I have to create a function that Onclick of any month
        //send the month into the new user object(Cloned from the current user)
        //filter out only the current month from the transactions and print out the Pdf
        return (
          <div key={ind}>
            <h3>{yearObj}</h3>

            <div>
              {newYear[yearObj].map((month, ind) => {
                return (
                  <UserPDFLib
                    user={user}
                    month={month}
                    year={yearObj}
                    key={ind}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Statements;
