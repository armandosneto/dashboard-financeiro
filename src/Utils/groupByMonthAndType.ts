import dayjs from "dayjs";

export const groupByMonthAndType = (transactions: Models.Transaction[]) => {
  type GroupedData = {
    [key: string]: {
      [key: string]: {
        total: number;
      };
    };
  };

  const groupedData: GroupedData = {
    deposit: {},
    withdraw: {},
  } as GroupedData;

  transactions.forEach((transaction) => {
    const date = dayjs(transaction.date);
    const monthYear = date.format("MMM YYYY");

    // Ensure groupedData[transaction.transaction_type] exists before accessing monthYear
    if (!groupedData[transaction.transaction_type]) {
      groupedData[transaction.transaction_type] = {};
    }

    if (!groupedData[transaction.transaction_type][monthYear]) {
      groupedData[transaction.transaction_type][monthYear] = {
        total: 0,
      };
    }
    groupedData[transaction.transaction_type][monthYear].total +=
      parseInt(transaction.amount, 10) / 100;
  });
  return groupedData;
};
