import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "../../components/Goals/GoalItem";
import GoalInput from "../../components/Goals/GoalInput";
import { StatusBar } from "expo-status-bar";

type GoalsType = { text: string; id: string };

const Goals = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState<GoalsType[]>([]);

  const endGoalHandler = () => {
    setModalIsVisible(false);
  };

  const addGoalHandler = (enteredText: string) => {
    if (enteredText.length === 0) {
      return;
    }

    setGoals((currentGoals: GoalsType[]) => [
      ...currentGoals,
      { text: enteredText, id: Math.random().toString() },
    ]);

    endGoalHandler();
  };

  const deleteGoalHandler = (id: string) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => id !== goal.id));
  };

  const modalToggleVisibilityHandler = () => {
    setModalIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#170acc"
          onPress={modalToggleVisibilityHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteHandler={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Goals;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#08125a",
  },
  goalsContainer: {
    flex: 4,
    marginTop: 8,
  },
});
