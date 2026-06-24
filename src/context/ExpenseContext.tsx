import { createContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import type { Expense } from "../types/expense";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: number) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined,
);

//ProviderProps
interface ProviderProps {
  children: React.ReactNode;
}

export function ExpenseProvider({ children }: ProviderProps) {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  //Thêm chi tiêu
  const addExpense = useCallback(
    (expense: Omit<Expense, "id">) => {
      const newExpense = { ...expense, id: Date.now() };
      setExpenses((prev) => [...prev, newExpense]);
    },
    [setExpenses],
  );

  //xóa chi tiêu
  const deleteExpense = useCallback(
    (id: number) => {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    },
    [setExpenses],
  );

  const contextValue = useMemo(
    () => ({
      expenses,
      addExpense,
      deleteExpense,
    }),
    [expenses, addExpense, deleteExpense],
  );

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
}
