import axios from "axios";
import { ExpenseType } from "../type-utilities/type";

const BACKEND_URL =
  "https://expense-tracker-2a1b2-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = (expenseData: ExpenseType) => {
  axios.post(BACKEND_URL + "/expenses.json", expenseData);
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses: ExpenseType[] = [];

  for (const key in response.data) {
    const expenseObj: ExpenseType = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };

    console.log("The DATE!!!", typeof expenseObj.date);
    expenses.push(expenseObj);
  }

  return expenses;
};
