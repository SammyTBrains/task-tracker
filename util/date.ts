import { ExpenseTypeWithStringDate } from "../type-utilities/type";
import { useSelector } from "react-redux";

export const getFormattedDate = (date: Date) => date.toISOString().slice(0, 10);

export const getDateMinusDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

const deserializeDate = (isoString: string) => new Date(isoString);

export const deserializeExpenseDataDate = () =>
  useSelector(
    (state: { expenses: { expenses: ExpenseTypeWithStringDate[] } }) =>
      state.expenses.expenses
  ).map((expense) => ({
    ...expense,
    date: deserializeDate(expense.date),
  }));
