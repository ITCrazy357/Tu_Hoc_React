import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { Expense } from "../types/expense";

import { useMemo } from "react";

import { formatCurrency } from "../utils/formatCurrency";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface ExpensesChartProps {
  expenses: Expense[];
}

export function ExpensesChart({ expenses }: ExpensesChartProps) {
  const chartData = useMemo(() => {
    const categoryMap: Record<string, number> = {};

    expenses.forEach((expense) => {
      categoryMap[expense.category] =
        (categoryMap[expense.category] || 0) + expense.amount;
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  if (expenses.length === 0) {
    return <p>Chưa có dữ liệu để thống kê</p>;
  }

  return (
    <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
      <h3>Chi tiêu theo danh mục</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensesChart;
