import { uid } from "quasar";

export function addBalance({ commit }, balance) {
  let balId = uid();
  let payload = {
    id: balId,
    ...balance
  };
  commit("ADD_BALANCE", payload);
}

export const updateBalance = ({ commit }, payload) => {
  commit("UPDATE_BALANCE", payload);
};

export const deleteBalance = ({ commit }, id) => {
  commit("DELETE_BALANCE", id);
};
