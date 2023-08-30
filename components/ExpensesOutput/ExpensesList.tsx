import { FlatList, Text } from "react-native";
import { ExpenseType } from "../../type-utilities/type";

type Props = { expenses: ExpenseType[] };

const ExpensesList = (props: Props) => {
  const renderExpenseItem = (itemData: { item: ExpenseType }) => (
    <Text>{itemData.item.description}</Text>
  );

  return (
    <FlatList
      data={props.expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
