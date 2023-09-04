import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

import { ExpenseType } from "../type-utilities/type";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const expenses = useSelector(
    (state: { expenses: { expenses: ExpenseType[] } }) =>
      state.expenses.expenses
  );

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const days7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > days7DaysAgo; //more recent than 7 days ago date
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 days" />
  );
};

export default RecentExpenses;
