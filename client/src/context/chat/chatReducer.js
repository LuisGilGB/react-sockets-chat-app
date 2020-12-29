import { ACTIONS } from "./chatActions";

export const initialState = {
  uid: "",
  activeChat: null,
  users: [],
  messages: [],
};

export const chatReducer = (state, { type, payload }) => {
  const reducers = {
    [ACTIONS.SET_CURRENT_UID]: () => ({
      uid: payload.uid || initialState.uid,
    }),
    [ACTIONS.SET_USERS]: () => ({
      users: payload.users.filter((u) => u.uid !== state.uid),
    }),
    [ACTIONS.SELECT_CHAT]: () => ({
      activeChat: payload.uid,
    }),
  };

  return reducers[type] ? { ...state, ...reducers[type]() } : state;
};
