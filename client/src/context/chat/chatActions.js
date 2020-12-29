export const ACTIONS = {
  SET_CURRENT_UID: "SET_CURRENT_UID",
  SET_USERS: "SET_USERS",
  SELECT_CHAT: "SELECT_CHAT",
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
};
