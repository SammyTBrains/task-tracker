import { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch } from "react-redux";

import { deserializeExpenseDataDate, getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const dispatch = useDispatch();
  const expenses = deserializeExpenseDataDate();

  const [isFetchingExpenses, setIsFetchingExpenses] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetchingExpenses(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetchingExpenses(false);
    };

    getExpenses();
  }, []);

  if (isFetchingExpenses) {
    return <LoadingOverlay />;
  }

  if (error && !isFetchingExpenses) {
    return <ErrorOverlay message={error} />;
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
