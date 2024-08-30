import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  Text,
} from "react-native";
import DatePicker from "../ManageExpense/DatePicker";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  onAddGoal: (enteredText: string, enteredDate: string) => void;
  visible: boolean;
  onCancel: () => void;
};

const GoalInput = (props: Props) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const goalInputHandler = (enteredText: string) => {
    setEnteredText(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredText, enteredDate);
    setEnteredText("");
  };

  const settingEnteredDate = (fieldName: string, value: string) => {
    setEnteredDate(value);
  };

  const setFieldTouched = (fieldName: string, bool: boolean) => {};

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/goal.png")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "60%", alignItems: "center" }}>
            <Text style={styles.goalInputLabel}>Goal</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your course goals!"
              onChangeText={goalInputHandler}
              value={enteredText}
            />
          </View>
          <DatePicker
            style={styles.rowInputs}
            setFieldValue={settingEnteredDate}
            setFieldTouched={setFieldTouched}
            value={enteredDate}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#085dcc" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1b326b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  rowInputs: {
    // flex: 1,
  },
  goalInputLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  textInput: {
    // borderWidth: 1,
    // borderColor: "#d0eeff",
    backgroundColor: GlobalStyles.colors.primary100,
    color: "#120438",
    width: "70%",
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
