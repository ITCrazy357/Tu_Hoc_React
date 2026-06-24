import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import { useExpenses } from "./hooks/useExpenses";
import { formatCurrency } from "./utils/formatCurrency";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const { expenses } = useExpenses();

  // Lọc chi tiêu theo danh mục
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Tìm kiếm
  const [search, setSearch] = useState("");

  const filteredExpenses =
    expenses && expenses.length > 0
      ? expenses.filter((expense) => {
          // Lọc chi tiêu theo danh mục
          const matchCategory =
            selectedCategory === "All" ||
            expense.category === selectedCategory;

          // Tìm kiếm
          const matchSearch = expense.title
            .toLowerCase()
            .includes(search.toLowerCase());

          return matchCategory && matchSearch;
        })
      : [];

  // Tính tổng chi tiêu
  const total = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="card">
        <ExpenseForm />
      </div>

      <div className="filters card">
        <div className="form-group">
          <label>Filter by Category</label>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div className="form-group">
          <label>Search Expenses</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <h2>Expenses</h2>
        <ExpenseList expenses={filteredExpenses} />
        <div className="total">
          Total: {formatCurrency(total)}
        </div>
      </div>
    </div>
  );
}

export default App;
