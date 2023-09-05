import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Input from "./Input";
import Button from "../UI/Button";
import { ExpenseType } from "../../type-utilities/type";
import { getFormattedDate } from "../../util/date";

type Props = {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseType) => void;
  defaultExpense: ExpenseType | undefined;
};

type FormValues = {
  amount: string;
  date: string;
  description: string;
};

const validationSchema = yup.object().shape({
  amount: yup
    .string()
    .required("Amount is required")
    .test(
      "is-number",
      "Amount must be a valid number",
      (value) => !isNaN(parseFloat(value))
    ),
  date: yup
    .string()
    .required("Date is required")
    .test(
      "is-date",
      "Date must be a valid date",
      (value) => !isNaN(Date.parse(value))
    ),
  description: yup.string().required("Description is required"),
});

const ExpenseForm = (props: Props) => {
  const initialValues: FormValues = {
    amount: props.defaultExpense ? props.defaultExpense.amount.toString() : "",
    date: props.defaultExpense
      ? getFormattedDate(props.defaultExpense.date)
      : "",
    description: props.defaultExpense ? props.defaultExpense.description : "",
  };

  const onSubmit = (values: FormValues) => {
    const expenseData = {
      id: "",
      amount: +values.amount,
      date: new Date(values.date),
      description: values.description,
    };

    props.onSubmit(expenseData);
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <Text style={styles.title}>Your Expense</Text>
              <View style={styles.inputsRow}>
                <Input
                  style={styles.rowInputs}
                  label="Amount"
                  textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: handleChange("amount"),
                    onBlur: handleBlur("amount"),
                    value: values.amount,
                  }}
                  errorText={errors.amount}
                  touched={touched.amount}
                />
                <Input
                  style={styles.rowInputs}
                  label="Date"
                  textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: handleChange("date"),
                    onBlur: handleBlur("date"),
                    value: values.date,
                  }}
                  errorText={errors.date}
                  touched={touched.date}
                />
              </View>
              <Input
                label="Description"
                textInputConfig={{
                  multiline: true,
                  onChangeText: handleChange("description"),
                  onBlur: handleBlur("description"),
                  value: values.description,
                }}
                errorText={errors.description}
                touched={touched.description}
              />
              <View style={styles.buttons}>
                <Button styles={styles.button} flat onPress={props.onCancel}>
                  Cancel
                </Button>
                <Button styles={styles.button} onPress={() => handleSubmit()}>
                  {props.submitButtonLabel}
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInputs: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
