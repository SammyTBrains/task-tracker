export type RootNavParamList = {
  ExpenseOverview: undefined;
  AllExpenses: undefined;
  RecentExpenses: undefined;

  ManageExpense: undefined;
};

export type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};
