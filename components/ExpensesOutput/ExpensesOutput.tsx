import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { ExpenseType } from "../../type-utilities/type";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  expenses: ExpenseType[];
  expensePeriod: string;
};

const ExpensesOutput = (props: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={props.expenses}
        expensePeriod={props.expensePeriod}
      />
      <ExpensesList expenses={props.expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
