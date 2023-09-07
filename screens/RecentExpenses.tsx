import { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch } from "react-redux";

import { deserializeExpenseDataDate, getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expenses-context";

const RecentExpenses = () => {
  const dispatch = useDispatch();
  const expenses = deserializeExpenseDataDate();
  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();

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
