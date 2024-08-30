import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  goal: string;
  date: string;
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.goalText}>{props.goal}</Text>
          <Text style={styles.goalText}>{props.date}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  presesdItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
