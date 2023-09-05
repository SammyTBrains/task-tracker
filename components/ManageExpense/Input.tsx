import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { GlobalStyles } from "../../constants/styles";

type Props = {
  label: string;
  textInputConfig: TextInputProps;
  errorText: string | undefined;
  style?: {};
  touched: any;
};

const Input = (props: Props) => {
  const inputStyle: {}[] = [styles.input];

  if (props.textInputConfig && props.textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiLine);
  }

  const invalid = props.touched && props.errorText;

  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, props.style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {props.label}
      </Text>
      <TextInput style={inputStyle} {...props.textInputConfig} />
      {invalid && <Text style={styles.errorText}>*{props.errorText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: GlobalStyles.colors.error500,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
