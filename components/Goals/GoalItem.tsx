import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  text: string;
  onDeleteHandler: (id: string) => void;
  id: string;
};

const GoalItem = (props: Props) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#0b0558" }}
        onPress={props.onDeleteHandler.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.presesdItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#170acc",
  },
  presesdItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
