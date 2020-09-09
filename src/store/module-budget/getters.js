export const incomeTotal = state => {
  return state.balance
    .filter(item => item.amount > 0)
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
};

export const expenseTotal = state => {
  return state.balance
    .filter(item => item.amount < 0)
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
};

export const totalBalance = state => {
  return state.balance
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
};
