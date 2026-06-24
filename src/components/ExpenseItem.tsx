import type { Expense } from "../types/expense";
import { formatCurrency } from "../utils/formatCurrency";

interface ExpenseItemProps {
  expense: Expense;
  deleteExpense: (id: number) => void;
}

function ExpenseItem({ expense, deleteExpense }: ExpenseItemProps) {
  return (
    <li className="expense-item">
      <div className="expense-item-details">
        <div className="expense-item-title">{expense.title}</div>
        <div className="text-sm text-gray-400">
          {new Date(expense.date).toLocaleDateString()}
        </div>
      </div>
      <div className="expense-item-actions">
        <div className="expense-item-category">{expense.category}</div>
        <div className="expense-item-amount">
          {formatCurrency(expense.amount)}
        </div>
        <button
          onClick={() => deleteExpense(expense.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
