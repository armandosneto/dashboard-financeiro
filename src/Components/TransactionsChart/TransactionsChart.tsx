"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { groupByMonthAndType } from "@/Utils/groupByMonthAndType";

interface Props {
  data: Models.Transaction[];
}

const TransactionsChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const groupedTransactions = groupByMonthAndType(data);

      const labels = Object.keys(groupedTransactions.deposit);
      const depositsValues = Object.values(groupedTransactions.deposit).map(
        (group) => group.total
      );
      const withdrawValues = Object.values(groupedTransactions.withdraw).map(
        (group) => group.total
      );

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Depósitos",
              data: depositsValues,
              backgroundColor: "green",
            },
            {
              label: "Saques",
              data: withdrawValues,
              backgroundColor: "red",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Amount",
              },
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [data]);

  return (
    <canvas
      style={{
        position: "relative",
        width: "100%",
        flex: 1,
      }}
      ref={chartRef}
    />
  );
};

export default TransactionsChart;
