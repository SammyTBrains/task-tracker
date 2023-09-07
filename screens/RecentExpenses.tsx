import { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";

import { ExpenseType } from "../type-utilities/type";
import { deserializeDate, getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expenses-context";

const RecentExpenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(
    (state: { expenses: { expenses: ExpenseType[] } }) =>
      state.expenses.expenses
  );

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();

      dispatch(setExpenses(expenses));
    };

    getExpenses();
  }, []);

  const recentExpenses = expenses
    .filter((expense) => {
      const today = new Date();
      const days7DaysAgo = getDateMinusDays(today, 7);

      const expenseDate = deserializeDate(expense.date as unknown as string); //because it is actually a string from redux

      return expenseDate >= days7DaysAgo && expenseDate <= today; //more recent than 7 days ago date
    })
    .map((expense) => ({
      ...expense,
      date: deserializeDate(expense.date as unknown as string), //because it is actually a string from redux
    }));

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallbacText="No expenses registered in the last 7 days!"
    />
  );
};

export default RecentExpenses;
