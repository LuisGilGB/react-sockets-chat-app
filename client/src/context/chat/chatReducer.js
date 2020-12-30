import { ACTIONS } from "./chatActions";

export const initialState = {
  uid: "",
  activeChat: null,
  users: [],
  fetchingMessages: false,
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
      messages: initialState.messages,
    }),
    [ACTIONS.RECEIVE_MESSAGE]: () => ({
      messages: [payload.message.from, payload.message.to].includes(
        state.activeChat
      )
        ? [...state.messages, payload.message]
        : state.message,
    }),
    [ACTIONS.LOAD_MESSAGES]: () => ({
      fetchingMessages: true,
    }),
    [ACTIONS.LOAD_MESSAGES_DONE]: () => ({
      fetchingMessages: false,
      messages: payload.data,
    }),
    [ACTIONS.LOAD_MESSAGES_FAILED]: () => ({
      fetchingMessages: false,
    }),
    [ACTIONS.CLOSE_SESSION]: () => initialState,
  };

  return reducers[type] ? { ...state, ...reducers[type]() } : state;
};
