import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../dummy-data/DUMMY-EXPENSES";

const AllExpenses = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} expensePeriod="Total" />;
};

export default AllExpenses;
