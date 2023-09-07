export type RootNavParamList = {
  ExpenseOverview: undefined;
  AllExpenses: undefined;
  RecentExpenses: undefined;

  ManageExpense: { expenseId: string };
};

export type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type ExpenseTypeWithStringDate = {
  id: string;
  description: string;
  amount: number;
  date: string;
};
