import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import Goals from "./screens/GoalsSection/Goals";
import ManageExpense from "./screens/BudgetTracking/ManageExpense";
import RecentExpenses from "./screens/BudgetTracking/RecentExpenses";
import AllExpenses from "./screens/BudgetTracking/AllExpenses";
import { RootNavParamList } from "./type-utilities/type";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import { store } from "./store/store";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootNavParamList>();
const BottomTabs = createBottomTabNavigator<RootNavParamList>();

const ExpenseOverview = () => (
  <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate("ManageExpense");
          }}
        />
      ),
    })}
  >
    <BottomTabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="AllExpenses"
      component={AllExpenses}
      options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

const BudgetTracker = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="ExpenseOverview"
      component={ExpenseOverview}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ManageExpense"
      component={ManageExpense}
      options={{
        presentation: "modal",
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen
              name="GoalsScreen"
              component={Goals}
              options={{ title: "Goals" }}
            />
            <Drawer.Screen
              name="BudgetTracker"
              component={BudgetTracker}
              options={{ title: "Budget Tracker" }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
