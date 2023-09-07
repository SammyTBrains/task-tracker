import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import {
  ExpenseTypeWithStringDate,
  RootNavParamList,
} from "../type-utilities/type";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  storeExpense,
  updateExpense as updateExpenseOnDB,
  deleteExpense as deleteExpenseOnDB,
} from "../util/http";
import { deserializeExpenseDataDate } from "../util/date";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

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
  const expenses = deserializeExpenseDataDate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editExpenseId = props.route.params?.expenseId;
  const isEditing = !!editExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editExpenseId
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  const deleteExpeneHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpenseOnDB(editExpenseId);
      dispatch(deleteExpense({ id: editExpenseId }));
      props.navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again!");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    props.navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseTypeWithStringDate) => {
    setIsSubmitting(true);
    try {
      if (editExpenseId) {
        dispatch(
          updateExpense({
            id: editExpenseId,
            data: expenseData,
          })
        );
        await updateExpenseOnDB(editExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        dispatch(addExpense({ ...expenseData, id: id }));
      }
      props.navigation.goBack();
    } catch (error) {
      setError("Could not submit data - please try again!");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultExpense={selectedExpense}
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
