import { useGetUserTransactionsQuery } from "@/app/RTK_Query/authApi";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { initialstateInterface } from "@/app/reduxSlices/userslice";

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

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <div>
      <h1>
        Account Number: {user?.accountNumber}
        <span> : {user?.Balance}</span>
      </h1>

      <h2>You have been assigned an initial Bonus of : {user?.Bonus}</h2>
      <h2>Your Transactions</h2>

      {user?.Transactions && user.Transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Transaction Type</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {user.Transactions.map((tx, i) => (
              <tr key={i}>
                <td>{tx.counterparty}</td>
                <td>{tx.counterpartyAccount}</td>
                <td>{tx.type}</td>
                <td>{tx.Date}</td>
                <td>${tx.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h1>You have no transactions</h1>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
