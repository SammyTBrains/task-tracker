import { useState } from "react";
import { FlatList, Text } from "react-native";
import { ExpenseType } from "../../type-utilities/type";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: ExpenseType[];
  onRefresh?: () => void;
  refreshing?: boolean;
};

const ExpensesList = (props: Props) => {
  const renderExpenseItem = (itemData: { item: ExpenseType }) => (
    <ExpenseItem {...itemData.item} />
  );

  return (
    <FlatList
      data={props.expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
    />
  );
};

export default ExpensesList;
