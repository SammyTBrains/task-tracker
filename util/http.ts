import axios from "axios";
import {
  ExpenseTypeWithStringDate,
  GoalsDataType,
  GoalsDataTypeWithID,
} from "../type-utilities/type";

const BACKEND_URL =
  "https://expense-tracker-2a1b2-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expenseData: ExpenseTypeWithStringDate) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const storeGoals = async (goalsData: GoalsDataType) => {
  const response = await axios.post(BACKEND_URL + "/goals.json", goalsData);

  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses: ExpenseTypeWithStringDate[] = [];

  for (const key in response.data) {
    const expenseObj: ExpenseTypeWithStringDate = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export const fetchGoals = async () => {
  const response = await axios.get(BACKEND_URL + "/goals.json");

  const goals: GoalsDataTypeWithID[] = [];

  for (const key in response.data) {
    const goalObj: GoalsDataTypeWithID = {
      goal: response.data[key].goal,
      date: response.data[key].date,
      id: key,
    };

    goals.push(goalObj);
  }

  return goals;
};

export const updateExpense = (
  id: string,
  expenseData: ExpenseTypeWithStringDate
) => axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);

export const deleteExpense = (id: string) =>
  axios.delete(BACKEND_URL + `/expenses/${id}.json`);

export const deleteGoal = (id: string) =>
  axios.delete(BACKEND_URL + `/goals/${id}.json`);
