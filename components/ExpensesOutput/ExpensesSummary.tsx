import { StyleSheet, Text, View } from "react-native";

import { ExpenseType } from "../../type-utilities/type";
import { GlobalStyles } from "../../constants/styles";

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
    <View style={styles.container}>
      <Text style={styles.period}>{props.expensePeriod}</Text>
      <Text style={styles.sum}>${expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
