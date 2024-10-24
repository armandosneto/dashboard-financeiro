"use client";
import { useAuthContext } from "@/Contexts/AuthContext";
import { useGetTransactions } from "@/Hooks/networking/Transactions";
import { message, Space, Typography } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, Loading, Main } from "./style";
import DashboardCard from "@/Components/DashboardCard";
import dayjs from "dayjs";
import TransactionsChart from "@/Components/TransactionsChart";

const DashboardPage: React.FC = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const getTransactions = useGetTransactions(token as string);
  const [transactions, setTransactions] = useState<Models.Transaction[]>();
  const [filters, setFilters] = useState<Models.Transaction.Filters>(
    {} as Models.Transaction.Filters
  );
  const [data, setData] =
    useState<Omit<Models.Transaction.ApiData, "transactions">>();

  const _getTransactions = useCallback(
    async (filters = {} as Models.Transaction.Filters) => {
      try {
        setLoading(true);
        const { transactions, ...data } = await getTransactions(filters);
        setTransactions(transactions);
        setData(data);
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

    return sums;
  }, [transactions]);

  const cards = useMemo(() => {
    return data
      ? [
          {
            title: "Período de Datas",
            content: `${dayjs(data.dates[0]).format("DD/MM/YYYY")} - ${dayjs(
              data.dates[data.dates.length - 1]
            ).format("DD/MM/YYYY")}`,
          },
          {
            title: "Total de Transações",
            content: `${data.total.toString()}`,
            extra: (
              <span>
                <Typography.Text type="secondary">
                  Total de transações
                </Typography.Text>
                <Typography.Title level={5} type="secondary">
                  <Space direction="vertical" size="small">
                    {Object.entries(summedAmountsByTransactionType).map(
                      ([type, total]) => (
                        <Typography.Text key={type}>
                          {type === "deposit" ? "Depósito" : "Saque"}: R${" "}
                          {total.toFixed(2)}
                        </Typography.Text>
                      )
                    )}
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
            extra: <span>Informações sobre as moedas</span>,
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
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      await _getTransactions();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      {loading ? (
        <Loading> Carregando... </Loading>
      ) : (
        <>
          <Typography.Title level={2}>Dashboard</Typography.Title>
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
