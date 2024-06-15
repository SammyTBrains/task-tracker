import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

type Props = {
  onAddGoal: (enteredText: string) => void;
  visible: boolean;
  onCancel: () => void;
};

const GoalInput = (props: Props) => {
  const [enteredText, setEnteredText] = useState("");

  const goalInputHandler = (enteredText: string) => {
    setEnteredText(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredText);
    setEnteredText("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goals!"
          onChangeText={goalInputHandler}
          value={enteredText}
        />
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
  textInput: {
    // borderWidth: 1,
    // borderColor: "#d0eeff",
    backgroundColor: "#d0eeff",
    color: "#120438",
    width: "100%",
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
