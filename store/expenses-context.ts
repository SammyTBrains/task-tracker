import { createSlice } from "@reduxjs/toolkit";
import { ExpenseType } from "../type-utilities/type";
import { DUMMY_EXPENSES } from "../dummy-data/dummy-expenses";

type StateTypes = {
  expenses: ExpenseType[];
};

const initialState: StateTypes = {
  expenses: DUMMY_EXPENSES,
};

const expenses = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses.unshift({ ...action.payload, id: id });
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

      state.expenses[updatableExpenseIndex] = action.payload.data;
    },
  },
});

export const addExpense = expenses.actions.addExpense;
export const deleteExpense = expenses.actions.deleteExpense;
export const updateExpense = expenses.actions.updateExpense;
export default expenses.reducer;
