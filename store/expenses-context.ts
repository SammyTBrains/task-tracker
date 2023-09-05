import { createSlice } from "@reduxjs/toolkit";
import { ExpenseType } from "../type-utilities/type";

type StateTypes = {
  expenses: ExpenseType[];
};

const initialState: StateTypes = {
  expenses: [],
};

const expenses = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses.unshift({ ...action.payload, id: id });
    },
    setExpenses: (state, action) => {
      // Convert Date strings back to Date objects
      state.expenses = action.payload.map((expense: ExpenseType) => ({
        ...expense,
        date: new Date(expense.date),
      }));
    },

    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
    updateExpense: (state, action) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      state.expenses[updatableExpenseIndex] = {
        ...action.payload.data,
        id: action.payload.id,
      };
    },
  },
});

export const addExpense = expenses.actions.addExpense;
export const setExpenses = expenses.actions.setExpenses;
export const deleteExpense = expenses.actions.deleteExpense;
export const updateExpense = expenses.actions.updateExpense;
export default expenses.reducer;
