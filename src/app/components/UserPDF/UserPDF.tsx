// components/UserPDFLib.tsx
"use client";

import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { transacs } from "@/app/RTK_Query/authApi";
import { filterByMonthYear } from "@/app/Utilities/utilities";

type Props = {
  user?: {
    displayName: string;
    email: string;
    accountNumber: string;
    Balance: number;
    Transactions: transacs[];
  };
  month: string;
  year: string;
};

//Main function

// const generateUserPdf = async (user: Props["user"]) => {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 800]);
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   let y = 750; // start from top

//   const drawLine = (text: string, size = 12, spacing = 20) => {
//     page.drawText(text, {
//       x: 50,
//       y,
//       size,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     y -= spacing;
//   };

//   // Title
//   drawLine("Account Summary", 20, 30);

//   // User Info
//   drawLine(`Name: ${user.displayName}`);
//   drawLine(`Email: ${user.email}`);
//   drawLine(`Account Number: ${user.accountNumber}`);
//   drawLine(`Balance: ${user.Balance.toLocaleString()}`);

//   // Transactions
//   drawLine("Recent Transactions:", 16, 25);

//   user.Transactions.slice()
//     .reverse()
//     .forEach((tx) => {
//       const txLine = `[${new Date(
//         tx.date
//       ).toLocaleDateString()}] ${tx.type.toUpperCase()} ${tx.amount.toLocaleString()} — ${
//         tx.description
//       }`;
//       drawLine(txLine, 11, 18);
//     });

//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = `${user.displayName}-account-summary.pdf`;
//   link.click();
// };

// const UserPDFLib = ({ user }: Props) => {
//   return (
//     <button
//       onClick={() => generateUserPdf(user)}
//       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//     >
//       Download PDF
//     </button>
//   );
// };

// export default UserPDFLib;

const generateUserPdf = async (
  user: Props["user"],
  month: Props["month"],
  year: Props["year"]
) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 750; // start from top

  const drawLine = (text: string, size = 12, spacing = 20) => {
    page.drawText(text, {
      x: 50,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
    y -= spacing;
  };

  // Title
  drawLine("Account Summary", 20, 30);

  if (!user) return;

  // User Info
  drawLine(`Name: ${user.displayName}`);
  drawLine(`Email: ${user.email}`);
  drawLine(`Account Number: ${user.accountNumber}`);
  drawLine(`Balance: ${user.Balance.toLocaleString()}`);

  // Transactions
  drawLine("Recent Transactions:", 16, 25);

  const monthTransactions = filterByMonthYear(user.Transactions, month, year);

  monthTransactions
    .slice()
    .reverse()
    .forEach((tx: transacs) => {
      let date: Date;

      if (typeof tx.Date === "string") {
        date = new Date(tx.Date);
      } else {
        date = tx.Date.toDate(); // Firestore Timestamp
      }

      const txLine = `[${date.toLocaleDateString()}] ${tx.type.toUpperCase()} ${tx.amount.toLocaleString()} — ${
        tx.description
      }`;

      drawLine(txLine, 11, 18);
    });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${user.displayName}-account-summary.pdf`;
  link.click();
};

const UserPDFLib = ({ user, month, year }: Props) => {
  return (
    <button
      onClick={() => generateUserPdf(user, month, year)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      {month}
    </button>
  );
};

export default UserPDFLib;
