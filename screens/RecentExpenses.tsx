import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../dummy-data/DUMMY-EXPENSES";

const RecentExpenses = () => {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} expensePeriod="Last 7 days" />
  );
};

export default RecentExpenses;
