import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootNavParamList } from "../type-utilities/type";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

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

  const deleteExpeneHandler = () => {};

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpeneHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
