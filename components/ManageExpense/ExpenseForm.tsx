import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

type FormValues = {
  amount: string;
  date: string;
  description: string;
};

const initialValues: FormValues = {
  amount: "",
  date: "",
  description: "",
};

const onSubmit = (values: FormValues) => {
  console.log(values);
};

const validationSchema = yup.object().shape({
  amount: yup.string().required(),
  date: yup.string().required(),
  description: yup.string().required(),
});

const ExpenseForm = () => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
            />
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
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
});
