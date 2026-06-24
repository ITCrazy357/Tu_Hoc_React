import { useState } from "react";
import type { Expense } from "../types/expense";
import { useExpenses } from "../hooks/useExpenses";

function ExpenseForm() {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleAddExpense = () => {
    if (!title || amount <= 0 || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense: Omit<Expense, "id"> = {
      title,
      amount,
      category,
      date,
    };
    addExpense(newExpense);
    setTitle("");
    setAmount(0);
    setDate("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddExpense();
      }}
    >
      <h2>Add a New Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Expense name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
