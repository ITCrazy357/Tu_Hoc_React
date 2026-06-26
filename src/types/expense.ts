import type { Category } from "./category";

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
  date: string;
}
