import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { ExpenseType } from "../../type-utilities/type";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  expenses: ExpenseType[];
  expensePeriod: string;
  fallbacText: string;
  onRefresh?: () => void;
  refreshing?: boolean;
};

const ExpensesOutput = (props: Props) => {
  let content = <Text style={styles.infoText}>{props.fallbacText}</Text>;

  if (props.expenses.length > 0) {
    content = (
      <ExpensesList
        expenses={props.expenses}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={props.expenses}
        expensePeriod={props.expensePeriod}
      />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
