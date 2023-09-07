import axios from "axios";
import { ExpenseTypeWithStringDate } from "../type-utilities/type";

const BACKEND_URL =
  "https://expense-tracker-2a1b2-default-rtdb.europe-west1.firebasedatabaseapp";

export const storeExpense = async (expenseData: ExpenseTypeWithStringDate) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
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

export const updateExpense = (
  id: string,
  expenseData: ExpenseTypeWithStringDate
) => axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);

export const deleteExpense = (id: string) =>
  axios.delete(BACKEND_URL + `/expenses/${id}.json`);
