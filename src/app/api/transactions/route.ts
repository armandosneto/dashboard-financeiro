import transactions from "@/data/transactions.json";
import { NextRequest, NextResponse } from "next/server";

function filterTransactions(
  data: Models.Transaction[],
  filters: Models.Transaction.Filters
) {
  return data.filter((transaction) => {
    return (
      (!filters.transaction_type ||
        transaction.transaction_type === filters.transaction_type) &&
      (!filters.currency || transaction.currency === filters.currency) &&
      (!filters.account || transaction.account === filters.account) &&
      (!filters.industry || transaction.industry === filters.industry) &&
      (!filters.state || transaction.state === filters.state) &&
      (!filters.minDate || transaction.date >= Number(filters.minDate)) &&
      (!filters.maxDate || transaction.date <= Number(filters.maxDate)) &&
      (!filters.minAmount ||
        Number(transaction.amount) >= Number(filters.minAmount)) &&
      (!filters.maxAmount ||
        Number(transaction.amount) <= Number(filters.maxAmount))
    );
  });
}

const getInfos = (data: Models.Transaction[]) => {
  const transactionTypes = new Set<string>();
  const currencies = new Set<string>();
  const accounts = new Set<string>();
  const industries = new Set<string>();
  const states = new Set<string>();
  const dates = new Set<number>();

  data.forEach((transaction) => {
    transactionTypes.add(transaction.transaction_type);
    currencies.add(transaction.currency);
    accounts.add(transaction.account);
    industries.add(transaction.industry);
    states.add(transaction.state);
    dates.add(transaction.date);
  });

  return {
    transactionTypes: Array.from(transactionTypes),
    currencies: Array.from(currencies),
    accounts: Array.from(accounts),
    industries: Array.from(industries),
    states: Array.from(states),
    dates: Array.from(dates).sort(),
  };
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Coleta os filtros da URL

  const filterKeys = [
    "transaction_type",
    "currency",
    "account",
    "industry",
    "state",
    "minDate",
    "maxDate",
    "minAmount",
    "maxAmount",
  ];

  const filters: { [key: string]: string | null } = {};

  filterKeys.forEach((key) => {
    filters[key] = searchParams.get(key);
  });

  // Aplica os filtros nos dados
  const filteredData = filterTransactions(
    transactions as Models.Transaction[],
    filters
  );

  const infos = getInfos(filteredData);

  return NextResponse.json({
    total: filteredData.length,
    ...infos,
    transactions: filteredData.sort((a, b) => a.date - b.date),
  } as Models.Transaction.ApiData);
}
