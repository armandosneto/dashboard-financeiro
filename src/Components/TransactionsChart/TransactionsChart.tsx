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

      // Destroy the previous chart if it exists
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

      // Create a new Chart instance with the updated data
      const newChart = new Chart(context, {
        type: "bar", // Adjust the chart type as needed
        data: {
          labels: labels,
          datasets: [
            {
              label: "Depósitos",
              data: depositsValues,
              backgroundColor: "green", // Customize the color
            },
            {
              label: "Saques",
              data: withdrawValues,
              backgroundColor: "red", // Customize the color
            },
          ],
        },
        options: {
          // Customize chart options as needed
          scales: {
            x: {
              type: "category", // Use 'category' for discrete labels
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
        objectFit: "contain",
      }}
      ref={chartRef}
    />
  );
};

export default TransactionsChart;
