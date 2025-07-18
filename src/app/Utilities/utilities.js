// export const generateYearMonthArray = (startDate) => {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const startYear = startDate.getFullYear();
//   const startMonth = startDate.getMonth(); // 0-indexed
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const yearData = [];

//   for (
//     let year = startYear;
//     year <= currentYear && yearData.length < 5;
//     year++
//   ) {
//     let fromMonth = year === startYear ? startMonth : 0;
//     let toMonth = year === currentYear ? currentMonth : 11;

//     const months = monthNames.slice(fromMonth, toMonth + 1);
//     yearData.push({ [year]: months });
//   }

//   return yearData.slice(1);
// };

//const result = generateYearMonthArray(new Date("2025-01-01"));
//console.log(result);

export const generateYearMonthArray = (startDate) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth(); // 0-indexed
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const yearData = {};

  for (
    let year = startYear;
    year <= currentYear && Object.keys(yearData).length < 5;
    year++
  ) {
    let fromMonth = year === startYear ? startMonth : 0;
    let toMonth = year === currentYear ? currentMonth : 11;

    const months = monthNames.slice(fromMonth, toMonth + 1);

    yearData[year] = months;
  }

  return yearData;
};

export const targetMonthPDF = (transactions, month) => {
  return transactions.filter((trans) => {
    const dateString = trans.Date;
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthString = monthNames[date.getUTCMonth()];

    return month.toLowerCase() === monthString.toLowerCase();
  });
};
