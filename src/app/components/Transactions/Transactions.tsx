import { useGetUserTransactionsQuery } from "@/app/RTK_Query/authApi";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

const TransactionsPage = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    data: transactions,
    isLoading,
    error,
  } = useGetUserTransactionsQuery(currentUser?.uid);

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <div>
      <h1>
        Account Number: {transactions?.accountNumber}
        <span> : {transactions?.Balance}</span>
      </h1>

      <h2>
        You have been assigned an initial Bonus of : {transactions?.Bonus}
      </h2>
      <h2>Your Transactions</h2>

      {transactions?.Transactions && transactions.Transactions.length > 0 ? (
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
            {transactions.Transactions.map((tx, i) => (
              <tr key={i}>
                <td>{tx.AccountNumber}</td>
                <td>{tx.AccountName}</td>
                <td>{tx.type}</td>
                {/* <td>{tx.Date}</td> */}
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
