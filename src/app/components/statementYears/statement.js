//Dynamic month generator from utility folder

export const statementYears = () => {
  const maindate = new Date("July 20, 2025 00:20:18").getFullYear(); // 2025
  const tenYearsAhead = 2030; // Target year

  let years = [];

  const toMap = tenYearsAhead - maindate; // Difference in years
  console.log(toMap, maindate); // For debugging

  if (toMap > 0) {
    years = Array.from({ length: toMap }).map((_, index) => {
      return `${maindate + index + 1}`; // +1 to start from next year (2026)
    });

    // Only slice if there are more than 5 years
    if (years.length > 5) {
      years = years.slice(5);
    }

    // Ensure the final year (2026) is present only once
    if (!years.includes(`${tenYearsAhead}`)) {
      years.push(`${tenYearsAhead}`);
    }
  } else {
    years = [`${maindate}`];
  }

  return years;
};
