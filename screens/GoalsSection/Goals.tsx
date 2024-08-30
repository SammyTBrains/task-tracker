import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "../../components/Goals/GoalItem";
import GoalInput from "../../components/Goals/GoalInput";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "../../constants/styles";
import { deleteGoal, fetchGoals } from "../../util/http";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import { GoalsDataTypeWithID } from "../../type-utilities/type";

type GoalsType = { goal: string; date: string; id: string };

const Goals = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState<GoalsType[]>([]);
  const [isFetchingGoals, setIsFetchingGoals] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGoals = async () => {
      await getData();
    };

    getGoals();
  }, []);

  const endGoalHandler = () => {
    setModalIsVisible(false);
  };

  const addGoalHandler = (enteredText: string, date: string, id: string) => {
    if (enteredText.length === 0) {
      return;
    }

    setGoals((currentGoals: GoalsType[]) => [
      ...currentGoals,
      { goal: enteredText, date: date, id: id },
    ]);

    endGoalHandler();
  };

  const getData = async () => {
    setIsFetchingGoals(true);
    try {
      const fetchedGoals: GoalsDataTypeWithID[] = await fetchGoals();
      const goalsConvertionContainer: GoalsType[] = [];
      for (const key in fetchedGoals) {
        const goalObj: GoalsType = {
          goal: fetchedGoals[key].goal,
          date: fetchedGoals[key].date,
          id: fetchedGoals[key].id,
        };

        goalsConvertionContainer.push(goalObj);
      }
      setGoals(goalsConvertionContainer);
      setError(null);
    } catch (error) {
      setError("Could not fetch goals!");
    }
    setIsFetchingGoals(false);
  };

  const deleteGoalHandler = async (id: string) => {
    setIsDeleting(true);
    try {
      console.log("id: " + id);
      await deleteGoal(id);
      setGoals((currentGoals) => currentGoals.filter((goal) => id !== goal.id));
      setIsDeleting(false);
    } catch (error) {
      setError("Could not delete goal - please try again!");
      setIsDeleting(false);
    }
  };

  const modalToggleVisibilityHandler = () => {
    setModalIsVisible((prevState) => !prevState);
  };

  if (isFetchingGoals || isDeleting) {
    return <LoadingOverlay />;
  }

  if (error && !isFetchingGoals && !isDeleting) {
    return (
      <ErrorOverlay message={error} buttonText="Retry!" onConfirm={getData} />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={GlobalStyles.colors.primary800}
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
            onRefresh={getData}
            refreshing={isFetchingGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  goal={itemData.item.goal}
                  date={itemData.item.date}
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
    backgroundColor: GlobalStyles.colors.primary700,
  },
  goalsContainer: {
    flex: 4,
    marginTop: 8,
  },
});
