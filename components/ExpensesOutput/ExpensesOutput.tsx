import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { ExpenseType } from "../../type-utilities/type";

type Props = {
  expenses: ExpenseType[];
  expensePeriod: string;
};

const ExpensesOutput = (props: Props) => {
  return (
    <View>
      <ExpensesSummary
        expenses={props.expenses}
        expensePeriod={props.expensePeriod}
      />
      <ExpensesList expenses={props.expenses} />
    </View>
  );
};

export default ExpensesOutput;
