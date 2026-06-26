import { categories } from "../constants/categories";
import type { Category } from "../types/category";
import type { Expense } from "../types/expense";

type PeriodGetter = (expense: Expense) => string;

interface ReportBucket {
  total: number;
  count: number;
}

export interface CategoryReportItem {
  category: Category;
  total: number;
  count: number;
  percentage: number;
}

export interface PeriodReportItem {
  period: string;
  total: number;
  count: number;
}

export interface ExpenseReport {
  total: number;
  count: number;
  average: number;
  largestExpense: Expense | null;
  smallestExpense: Expense | null;
  categoryReport: CategoryReportItem[];
  monthlyReport: PeriodReportItem[];
  dailyReport: PeriodReportItem[];
}

export function getTotalExpense(expenses: Expense[]) {
  return expenses.reduce((sum, item) => sum + item.amount, 0);
}

export function getMonthlyTotal(expenses: Expense[], month?: string) {
  const monthlyExpenses = month
    ? expenses.filter((expense) => getMonthKey(expense.date) === month)
    : expenses;

  return getTotalExpense(monthlyExpenses);
}

export function getAverageExpense(expenses: Expense[]) {
  if (expenses.length === 0) {
    return 0;
  }

  return getTotalExpense(expenses) / expenses.length;
}

export function getLargestExpense(expenses: Expense[]) {
  return expenses.reduce<Expense | null>((largest, expense) => {
    if (largest === null || expense.amount > largest.amount) {
      return expense;
    }

    return largest;
  }, null);
}

export function getSmallestExpense(expenses: Expense[]) {
  return expenses.reduce<Expense | null>((smallest, expense) => {
    if (smallest === null || expense.amount < smallest.amount) {
      return expense;
    }

    return smallest;
  }, null);
}

export function getCategoryReport(expenses: Expense[]) {
  const totalExpense = getTotalExpense(expenses);
  const reportMap = categories.reduce<Record<Category, ReportBucket>>(
    (map, category) => ({
      ...map,
      [category]: {
        total: 0,
        count: 0,
      },
    }),
    {} as Record<Category, ReportBucket>,
  );

  expenses.forEach((expense) => {
    reportMap[expense.category].total += expense.amount;
    reportMap[expense.category].count += 1;
  });

  return categories.map<CategoryReportItem>((category) => {
    const item = reportMap[category];

    return {
      category,
      total: item.total,
      count: item.count,
      percentage:
        totalExpense === 0 ? 0 : roundPercentage((item.total / totalExpense) * 100),
    };
  });
}

export function getMonthlyReport(expenses: Expense[]) {
  return getPeriodReport(expenses, (expense) => getMonthKey(expense.date));
}

export function getDailyReport(expenses: Expense[]) {
  return getPeriodReport(expenses, (expense) => getDateKey(expense.date));
}

export function getExpenseReport(expenses: Expense[]): ExpenseReport {
  return {
    total: getTotalExpense(expenses),
    count: expenses.length,
    average: getAverageExpense(expenses),
    largestExpense: getLargestExpense(expenses),
    smallestExpense: getSmallestExpense(expenses),
    categoryReport: getCategoryReport(expenses),
    monthlyReport: getMonthlyReport(expenses),
    dailyReport: getDailyReport(expenses),
  };
}

export function getMonthKey(date: string) {
  const [year, month] = date.split("-");

  return year && month ? `${year}-${month}` : "Unknown";
}

export function getDateKey(date: string) {
  return date || "Unknown";
}

function getPeriodReport(expenses: Expense[], getPeriod: PeriodGetter) {
  const reportMap = new Map<string, ReportBucket>();

  expenses.forEach((expense) => {
    const period = getPeriod(expense);
    const current = reportMap.get(period) ?? { total: 0, count: 0 };

    reportMap.set(period, {
      total: current.total + expense.amount,
      count: current.count + 1,
    });
  });

  return Array.from(reportMap.entries())
    .sort(([firstPeriod], [secondPeriod]) =>
      firstPeriod.localeCompare(secondPeriod),
    )
    .map<PeriodReportItem>(([period, item]) => ({
      period,
      total: item.total,
      count: item.count,
    }));
}

function roundPercentage(value: number) {
  return Math.round(value * 100) / 100;
}
