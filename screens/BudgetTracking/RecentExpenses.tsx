import { useEffect, useState } from "react";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { useDispatch } from "react-redux";

import { deserializeExpenseDataDate, getDateMinusDays } from "../../util/date";
import { fetchExpenses } from "../../util/http";
import { setExpenses } from "../../store/expenses-context";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const dispatch = useDispatch();
  const expenses = deserializeExpenseDataDate();

  const [isFetchingExpenses, setIsFetchingExpenses] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getExpenses = async () => {
      await getData();
    };

    getExpenses();
  }, []);

  const getData = async () => {
    setIsFetchingExpenses(true);
    try {
      const expenses = await fetchExpenses();
      dispatch(setExpenses(expenses));
      setError(null);
    } catch (error) {
      setError("Could not fetch expenses!");
    }
    setIsFetchingExpenses(false);
  };

  if (isFetchingExpenses) {
    return <LoadingOverlay />;
  }

  if (error && !isFetchingExpenses) {
    return (
      <ErrorOverlay message={error} buttonText="Retry!" onConfirm={getData} />
    );
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
      onRefresh={getData}
      refreshing={isFetchingExpenses}
    />
  );
};

export default RecentExpenses;
