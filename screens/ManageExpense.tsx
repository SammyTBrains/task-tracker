import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootNavParamList } from "../type-utilities/type";

type ManageExpenseScreenRouteProp = RouteProp<
  RootNavParamList,
  "ManageExpense"
>;

type ManageExpenseScreenNavigationProp = NativeStackNavigationProp<
  RootNavParamList,
  "ManageExpense"
>;

type Props = {
  route: ManageExpenseScreenRouteProp;
  navigation: ManageExpenseScreenNavigationProp;
};

const ManageExpense = (props: Props) => {
  const editExpenseId = props.route.params?.expenseId;
  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  return <Text>Manage Expesne screen</Text>;
};

export default ManageExpense;
