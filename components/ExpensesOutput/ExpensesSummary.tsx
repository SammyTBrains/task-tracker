import { Text, View } from "react-native";
import { ExpenseType } from "../../type-utilities/type";

type Props = {
  expenses: ExpenseType[];
  expensePeriod: string;
};

const ExpensesSummary = (props: Props) => {
  const expenseSum = props.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View>
      <Text>{props.expensePeriod}</Text>
      <Text>${expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
