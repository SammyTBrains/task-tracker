import { createSlice } from "@reduxjs/toolkit";
import { ExpenseTypeWithStringDate } from "../type-utilities/type";

type StateTypes = {
  expenses: ExpenseTypeWithStringDate[]; //date is actually a string for and from redux
};

const initialState: StateTypes = {
  expenses: [],
};

const expenses = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload.reverse();
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
