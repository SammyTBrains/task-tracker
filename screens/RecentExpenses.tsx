import { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch } from "react-redux";

import { deserializeExpenseDataDate, getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const RecentExpenses = () => {
  const dispatch = useDispatch();
  const expenses = deserializeExpenseDataDate();

  const [isFetchingExpenses, setIsFetchingExpenses] = useState<boolean>();

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetchingExpenses(true);
      const expenses = await fetchExpenses();
      dispatch(setExpenses(expenses));
      setIsFetchingExpenses(false);
    };

    getExpenses();
  }, []);

  if (isFetchingExpenses) {
    return <LoadingOverlay />;
  }

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
