import type { Expense } from "../types/expense";

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
      <h2>
        Tổng:
        {currencyFormatter.format(total)}
      </h2>

      <h2>
        Giao dịch:
        {count}
      </h2>

      <h2>
        Trung bình:
        {currencyFormatter.format(average)}
      </h2>
    </div>
  );
}
