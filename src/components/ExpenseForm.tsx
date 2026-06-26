import { useForm } from "react-hook-form";
import { categories } from "../constants/categories";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

type ExpenseFormData = Omit<Expense, "id">;

const defaultValues: ExpenseFormData = {
  title: "",
  amount: 0,
  category: categories[0],
  date: "",
};

function ExpenseForm() {
  const { addExpense } = useExpenses();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ defaultValues });

  const onSubmit = (data: ExpenseFormData) => {
    addExpense(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a New Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Expense name"
            {...register("title", {
              required: "Enter expense name",
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            {...register("amount", {
              valueAsNumber: true,
              validate: (value) => value > 0 || "Amount must be greater than 0",
            })}
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select className="form-control" {...register("category")}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            {...register("date", {
              required: "Select date",
            })}
          />
          {errors.date && <p>{errors.date.message}</p>}
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
