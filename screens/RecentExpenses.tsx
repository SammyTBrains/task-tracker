import { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";

import { ExpenseType } from "../type-utilities/type";
import { getDateMinusDays } from "../util/date";
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
      expenses.forEach((element) => {
        console.log("The date in recent", typeof element.date);
      });

      dispatch(setExpenses(expenses));
    };

    getExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const days7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= days7DaysAgo && expense.date <= today; //more recent than 7 days ago date
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallbacText="No expenses registered in the last 7 days!"
    />
  );
};

export default RecentExpenses;
