import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";

import { deserializeExpenseDataDate } from "../../util/date";

const AllExpenses = () => {
  const expenses = deserializeExpenseDataDate();

  return (
    <ExpensesOutput
      expenses={expenses}
      expensePeriod="Total"
      fallbacText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
