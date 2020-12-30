export const ACTIONS = {
  SET_CURRENT_UID: "SET_CURRENT_UID",
  SET_USERS: "SET_USERS",
  SELECT_CHAT: "SELECT_CHAT",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  LOAD_MESSAGES: "LOAD_MESSAGES",
  LOAD_MESSAGES_DONE: "LOAD_MESSAGES_DONE",
  LOAD_MESSAGES_FAILED: "LOAD_MESSAGES_FAILED",
  CLOSE_SESSION: "CLOSE_SESSION",
};

export const actionCreators = {
  logInDone: (uid) => ({
    type: ACTIONS.SET_CURRENT_UID,
    payload: { uid },
  }),
  setUsers: (users) => ({
    type: ACTIONS.SET_USERS,
    payload: { users },
  }),
  selectChat: (uid) => ({
    type: ACTIONS.SELECT_CHAT,
    payload: { uid },
  }),
  receiveMessage: (message) => ({
    type: ACTIONS.RECEIVE_MESSAGE,
    payload: { message },
  }),
  loadMessages: () => ({
    type: ACTIONS.LOAD_MESSAGES,
    payload: {},
  }),
  loadMessagesDone: (data) => ({
    type: ACTIONS.LOAD_MESSAGES_DONE,
    payload: { data },
  }),
  loadMessagesFailed: () => ({
    type: ACTIONS.LOAD_MESSAGES_FAILED,
    payload: {},
  }),
  closeSession: () => ({
    type: ACTIONS.CLOSE_SESSION,
    payload: {},
  }),
};
