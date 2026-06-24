import ExpenseItem from "./ExpenseItem";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

interface ExpenseListProps {
  expenses: Expense[];
}

function ExpenseList({ expenses }: ExpenseListProps) {
  const { deleteExpense } = useExpenses();
  if (expenses.length === 0) {
    return <p>Không có khoản chi nào</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          deleteExpense={deleteExpense}
        />
      ))}
    </ul>
  );
}

export default ExpenseList;
