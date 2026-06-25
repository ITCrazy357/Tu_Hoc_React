import type { Expense } from "../types/expense";
import StatCard from "./StatCard";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

interface DashboardProps {
  expenses: Expense[];
}

export function Dashboard({ expenses }: DashboardProps) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const count = expenses.length;

  const average = count === 0 ? 0 : total / count;

  return (
    <div>
      <StatCard title="Tổng chi tiêu" value={currencyFormatter.format(total)} />

      <StatCard title="Giao dịch" value={count} />

      <StatCard title="Trung bình" value={currencyFormatter.format(average)} />
    </div>
  );
}
