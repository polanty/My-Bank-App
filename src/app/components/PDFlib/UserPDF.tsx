// "use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// const PdfLibGenerator = async () => {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]);

//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const text = "Hello, this is a PDF built with pdf-lib!";

//   page.drawText(text, {
//     x: 50,
//     y: 350,
//     size: 24,
//     font,
//     color: rgb(0, 0, 0),
//   });

//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "generated.pdf";
//   link.click();
// };

// export default PdfLibGenerator;

const PdfLibGenerator = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]); // Use 800 height so (x:50, y:500) is visible

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const text = "Hello, this is a PDF built with pdf-lib second trial!";

  page.drawText(text, {
    x: 50,
    y: 700, // Make sure the y-coordinate is within the page height
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my-pdf.pdf";
  link.click();
};

const MyComponent = () => {
  return (
    <button
      onClick={() => {
        PdfLibGenerator(); // ✅ call like a function
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Generate PDF
    </button>
  );
};

export default MyComponent;
