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
              <View style={styles.rowInputs}>
                <Input
                  label="Amount"
                  textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: handleChange("amount"),
                    onBlur: handleBlur("amount"),
                    value: values.amount,
                  }}
                />
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                )}
              </View>
              <View style={styles.rowInputs}>
                <Input
                  label="Date"
                  textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: handleChange("date"),
                    onBlur: handleBlur("date"),
                    value: values.date,
                  }}
                />
                {errors.date && (
                  <Text style={styles.errorText}>{errors.date}</Text>
                )}
              </View>
            </View>
            <Input
              label="Description"
              textInputConfig={{
                multiline: true,
                onChangeText: handleChange("description"),
                onBlur: handleBlur("description"),
                value: values.description,
              }}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
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
  errorText: {
    color: GlobalStyles.colors.error500,
  },
});
