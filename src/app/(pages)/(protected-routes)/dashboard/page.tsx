"use client";
import { useAuthContext } from "@/Contexts/AuthContext";
import { useGetTransactions } from "@/Hooks/networking/Transactions";
import { message, Space, Typography } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, Loading, Main } from "./style";
import DashboardCard from "@/Components/DashboardCard";
import dayjs from "dayjs";
import TransactionsChart from "@/Components/TransactionsChart";
import DateFilter from "@/Components/DateFilter";

const DashboardPage: React.FC = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const getTransactions = useGetTransactions(token as string);
  const [transactions, setTransactions] = useState<Models.Transaction[]>();
  const [filters, setFilters] = useState<Models.Transaction.Filters>(
    JSON.parse(localStorage.getItem("filters") || "{}")
  );
  const [data, setData] =
    useState<Omit<Models.Transaction.ApiData, "transactions">>();

  const _getTransactions = useCallback(
    async (filters = {} as Models.Transaction.Filters) => {
      try {
        setLoading(true);
        const { transactions, ...data } = await getTransactions(
          Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value)
          )
        );
        setTransactions(transactions);
        setData(data);
        localStorage.setItem("filters", JSON.stringify(filters));
      } catch {
        message.error("Erro ao buscar transações");
      } finally {
        setLoading(false);
      }
    },
    [getTransactions]
  );

  const summedAmountsByTransactionType = useMemo(() => {
    const sums: Record<string, number> = {};

    transactions?.forEach((transaction) => {
      const { transaction_type, amount } = transaction;

      const numericAmount = parseInt(amount, 10) / 100;

      if (sums[transaction_type]) {
        sums[transaction_type] += numericAmount;
      } else {
        sums[transaction_type] = numericAmount;
      }
    });

    return {
      ...sums,
      balance: sums.deposit - sums.withdraw,
    } as Record<string, number>;
  }, [transactions]);

  const handleDateChange = useCallback(
    (dates: { minDate: number | undefined; maxDate: number | undefined }) => {
      const newFilters = {
        ...filters,
        minDate: dates.minDate ? dates.minDate.toString() : undefined,
        maxDate: dates.maxDate ? dates.maxDate.toString() : undefined,
      };

      setFilters(newFilters);
      _getTransactions(newFilters);
    },
    [filters, _getTransactions]
  );

  const cards = useMemo(() => {
    return data
      ? [
          {
            title: "Período de Datas",
            content: `${dayjs(data.dates[0]).format("DD/MM/YYYY")} - ${dayjs(
              data.dates[data.dates.length - 1]
            ).format("DD/MM/YYYY")}`,
            extra: (
              <DateFilter
                onChange={handleDateChange}
                initialValues={{
                  minDate: filters.minDate || data.dates[0],
                  maxDate: filters.maxDate || data.dates[data.dates.length - 1],
                }}
              />
            ),
          },
          {
            title: "Saldo",
            content: `R$ ${summedAmountsByTransactionType.balance.toFixed(2)}`,
            extra: (
              <span>
                <Typography.Text type="secondary">
                  Total de transações
                </Typography.Text>
                <Typography.Title level={5} type="secondary">
                  <Space direction="vertical" size="small">
                    <Typography.Text>Transações: {data.total}</Typography.Text>
                    <Typography.Text>
                      Depósitos: R${" "}
                      {summedAmountsByTransactionType.deposit?.toFixed(2)}
                    </Typography.Text>
                    <Typography.Text>
                      Saques: R${" "}
                      {summedAmountsByTransactionType.withdraw?.toFixed(2)}
                    </Typography.Text>
                  </Space>
                </Typography.Title>
              </span>
            ),
          },
          {
            title: "Contas",
            content: data.accounts.length,
            data: data.accounts,
          },
          {
            title: "Transações",
            content: (
              <TransactionsChart data={transactions as Models.Transaction[]} />
            ),
          },
          {
            title: "Indústrias",
            content: data.industries.length,
            data: data.industries,
          },
          {
            title: "Estados",
            content: data.states.length,
            data: data.states,
          },
        ]
      : [];
  }, [
    data,
    filters,
    handleDateChange,
    summedAmountsByTransactionType,
    transactions,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await _getTransactions(filters);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      {loading && !transactions ? (
        <Loading> Carregando... </Loading>
      ) : (
        <>
          <Typography.Title level={2} onClick={() => console.log(data)}>
            Dashboard
          </Typography.Title>
          <Grid>
            {cards.map((values, index) => (
              <DashboardCard key={index} {...values} />
            ))}
          </Grid>
        </>
      )}
    </Main>
  );
};

export default DashboardPage;
