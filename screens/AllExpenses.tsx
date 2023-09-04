import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

import { ExpenseType } from "../type-utilities/type";

const AllExpenses = () => {
  const expenses = useSelector(
    (state: { expenses: { expenses: ExpenseType[] } }) =>
      state.expenses.expenses
  );

  return <ExpensesOutput expenses={expenses} expensePeriod="Total" />;
};

export default AllExpenses;
