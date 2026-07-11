"use client";

import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
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

const pageWidth = 595;
const pageHeight = 842;
const margin = 42;
const brandGreen = rgb(0.13, 0.25, 0.16);
const brandOrange = rgb(0.85, 0.34, 0);
const paleStone = rgb(0.96, 0.94, 0.91);
const borderStone = rgb(0.82, 0.8, 0.75);
const textStone = rgb(0.18, 0.16, 0.14);
const mutedText = rgb(0.42, 0.39, 0.35);

const formatMoney = (amount: number) =>
  `GBP ${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value: transacs["Date"]) => {
  const date = typeof value === "string" ? new Date(value) : value.toDate();

  if (Number.isNaN(date.getTime())) return "Pending";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const safeFilePart = (value: string) =>
  value
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");

const truncate = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;

const drawText = (
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size = 10,
  color = textStone
) => {
  page.drawText(text, { x, y, font, size, color });
};

const drawFooter = (
  page: PDFPage,
  font: PDFFont,
  pageNumber: number,
  totalPages: number
) => {
  page.drawLine({
    start: { x: margin, y: 42 },
    end: { x: pageWidth - margin, y: 42 },
    thickness: 0.5,
    color: borderStone,
  });

  drawText(
    page,
    "EGO Bank statement generated from online banking.",
    margin,
    24,
    font,
    8,
    mutedText
  );
  drawText(
    page,
    `Page ${pageNumber} of ${totalPages}`,
    pageWidth - margin - 58,
    24,
    font,
    8,
    mutedText
  );
};

const drawTransactionHeader = (
  page: PDFPage,
  font: PDFFont,
  boldFont: PDFFont,
  y: number
) => {
  page.drawRectangle({
    x: margin,
    y: y - 10,
    width: pageWidth - margin * 2,
    height: 26,
    color: brandGreen,
  });

  const headers = [
    ["Date", margin + 10],
    ["Description", margin + 92],
    ["Counterparty", margin + 250],
    ["Type", margin + 374],
    ["Amount", margin + 452],
  ] as const;

  headers.forEach(([label, x]) =>
    drawText(page, label, x, y, boldFont || font, 9, rgb(1, 1, 1))
  );
};

const drawStatementChrome = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  font: PDFFont,
  boldFont: PDFFont,
  user: NonNullable<Props["user"]>,
  month: string,
  year: string
) => {
  page.drawRectangle({
    x: 0,
    y: pageHeight - 116,
    width: pageWidth,
    height: 116,
    color: brandGreen,
  });

  try {
    const logoBytes = await fetch("/Logo_white.png").then((res) =>
      res.arrayBuffer()
    );
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDims = logo.scale(0.045);
    page.drawImage(logo, {
      x: margin,
      y: pageHeight - 84,
      width: logoDims.width,
      height: logoDims.height,
    });
  } catch {
    drawText(page, "EGO Bank", margin, pageHeight - 68, boldFont, 20, rgb(1, 1, 1));
  }

  drawText(page, "Monthly Account Statement", margin, 704, boldFont, 24);
  drawText(
    page,
    `${month} ${year}`,
    margin,
    682,
    font,
    12,
    mutedText
  );

  drawText(page, "Statement period", 365, 704, boldFont, 10, mutedText);
  drawText(page, `${month} ${year}`, 365, 688, font, 12);
  drawText(page, "Generated", 365, 666, boldFont, 10, mutedText);
  drawText(page, new Date().toLocaleDateString("en-GB"), 365, 650, font, 12);

  page.drawRectangle({
    x: margin,
    y: 570,
    width: pageWidth - margin * 2,
    height: 74,
    color: paleStone,
    borderColor: borderStone,
    borderWidth: 0.6,
  });

  const summary = [
    ["Account holder", user.displayName || "Account holder", margin + 16],
    ["Email", user.email || "Not supplied", margin + 156],
    ["Account number", user.accountNumber || "Pending", margin + 316],
    ["Closing balance", formatMoney(user.Balance || 0), margin + 426],
  ] as const;

  summary.forEach(([label, value, x]) => {
    drawText(page, label, x, 616, boldFont, 8, mutedText);
    drawText(page, truncate(value, 20), x, 596, font, 10);
  });

  page.drawRectangle({
    x: margin,
    y: 535,
    width: pageWidth - margin * 2,
    height: 4,
    color: brandOrange,
  });
};

const generateUserPdf = async (
  user: Props["user"],
  month: Props["month"],
  year: Props["year"]
) => {
  if (!user) return;

  const monthTransactions = filterByMonthYear(
    user.Transactions,
    month,
    year
  ) as transacs[];
  const orderedTransactions = monthTransactions.slice().sort((a, b) => {
    const first = typeof a.Date === "string" ? new Date(a.Date) : a.Date.toDate();
    const second = typeof b.Date === "string" ? new Date(b.Date) : b.Date.toDate();
    return first.getTime() - second.getTime();
  });

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const rowsPerFirstPage = 15;
  const rowsPerContinuationPage = 24;
  const totalPages = Math.max(
    1,
    1 +
      Math.ceil(
        Math.max(orderedTransactions.length - rowsPerFirstPage, 0) /
          rowsPerContinuationPage
      )
  );

  let pageNumber = 1;
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  await drawStatementChrome(pdfDoc, page, font, boldFont, user, month, year);
  drawTransactionHeader(page, font, boldFont, 502);
  drawFooter(page, font, pageNumber, totalPages);

  let y = 472;
  let rowsOnCurrentPage = 0;
  let currentPageLimit = rowsPerFirstPage;

  const startContinuationPage = () => {
    pageNumber += 1;
    page = pdfDoc.addPage([pageWidth, pageHeight]);

    drawText(page, "Monthly Account Statement", margin, 788, boldFont, 18);
    drawText(page, `${month} ${year}`, margin, 766, font, 11, mutedText);
    drawTransactionHeader(page, font, boldFont, 730);
    drawFooter(page, font, pageNumber, totalPages);

    y = 700;
    rowsOnCurrentPage = 0;
    currentPageLimit = rowsPerContinuationPage;
  };

  if (orderedTransactions.length === 0) {
    page.drawRectangle({
      x: margin,
      y: 430,
      width: pageWidth - margin * 2,
      height: 48,
      borderColor: borderStone,
      borderWidth: 0.6,
      color: rgb(1, 1, 1),
    });
    drawText(
      page,
      "No transactions were recorded for this statement period.",
      margin + 14,
      452,
      font,
      10,
      mutedText
    );
  }

  orderedTransactions.forEach((tx, index) => {
    if (rowsOnCurrentPage >= currentPageLimit) {
      startContinuationPage();
    }

    const isCredit = tx.type?.toLowerCase() === "credit";
    const amountPrefix = isCredit ? "+" : "-";

    page.drawRectangle({
      x: margin,
      y: y - 8,
      width: pageWidth - margin * 2,
      height: 28,
      color: index % 2 === 0 ? rgb(1, 1, 1) : rgb(0.98, 0.97, 0.95),
    });
    page.drawLine({
      start: { x: margin, y: y - 8 },
      end: { x: pageWidth - margin, y: y - 8 },
      thickness: 0.35,
      color: borderStone,
    });

    drawText(page, formatDate(tx.Date), margin + 10, y + 2, font, 8.5);
    drawText(
      page,
      truncate(tx.description || "Transfer", 27),
      margin + 92,
      y + 2,
      font,
      8.5
    );
    drawText(
      page,
      truncate(tx.counterparty || "EGO Bank", 20),
      margin + 250,
      y + 2,
      font,
      8.5
    );
    drawText(
      page,
      isCredit ? "Credit" : "Debit",
      margin + 374,
      y + 2,
      font,
      8.5,
      isCredit ? rgb(0.03, 0.45, 0.2) : textStone
    );
    drawText(
      page,
      `${amountPrefix}${formatMoney(Math.abs(tx.amount || 0))}`,
      margin + 452,
      y + 2,
      boldFont,
      8.5,
      isCredit ? rgb(0.03, 0.45, 0.2) : textStone
    );

    y -= 28;
    rowsOnCurrentPage += 1;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const accountPart = user.accountNumber
    ? `-Account-${safeFilePart(user.accountNumber)}`
    : "";

  link.href = url;
  link.download = `EGO-Bank-Statement-${safeFilePart(year)}-${safeFilePart(
    month
  )}${accountPart}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};

const UserPDFLib = ({ user, month, year }: Props) => {
  return (
    <button
      onClick={() => generateUserPdf(user, month, year)}
      disabled={!user}
      className="rounded-md border border-stone-300 bg-white px-4 py-3 text-left font-semibold text-stone-800 transition hover:border-[#d95600] hover:text-[#d95600] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {month}
    </button>
  );
};

export default UserPDFLib;
