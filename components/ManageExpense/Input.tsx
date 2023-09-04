import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = { label: string; textInputConfig: TextInputProps };

const Input = (props: Props) => {
  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput {...props.textInputConfig} />
    </View>
  );
};

export default Input;
