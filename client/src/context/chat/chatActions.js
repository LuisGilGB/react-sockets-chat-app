export const ACTIONS = {
  SET_CURRENT_UID: "SET_CURRENT_UID",
  SET_USERS: "SET_USERS",
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
};
