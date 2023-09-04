import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses-context";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
