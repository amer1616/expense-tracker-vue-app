export function ADD_BALANCE(state, payload) {
  state.balance.push(payload);
}

export const DELETE_BALANCE = (state, payload) => {
  const ind = state.balance.findIndex(item => item.id === payload);
  state.balance.splice(ind, 1);
};

export const UPDATE_BALANCE = (state, payload) => {
  const ind = state.balance.findIndex(item => item.id === payload.id);
  Object.assign(state.balance[ind], { ...payload.updates });
};
