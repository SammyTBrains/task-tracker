import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { ExpenseType, RootNavParamList } from "../type-utilities/type";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

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
  const dispatch = useDispatch();

  const editExpenseId = props.route.params?.expenseId;
  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  const deleteExpeneHandler = () => {
    dispatch(deleteExpense({ id: editExpenseId }));
    props.navigation.goBack();
  };

  const cancelHandler = () => {
    props.navigation.goBack();
  };

  const confirmHandler = (expenseData: ExpenseType) => {
    if (editExpenseId) {
      dispatch(
        updateExpense({
          id: editExpenseId,
          data: expenseData,
        })
      );
    } else {
      dispatch(addExpense(expenseData));
    }

    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
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
