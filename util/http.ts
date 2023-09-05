import axios from "axios";
import { ExpenseType } from "../type-utilities/type";

export const storeExpesne = (expenseData: ExpenseType) => {
  axios.post(
    "https://expense-tracker-2a1b2-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
    expenseData
  );
};
