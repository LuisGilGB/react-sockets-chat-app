import { createContext, useCallback, useReducer } from "react";
import { actionCreators } from "./chatActions";
import { chatReducer, initialState } from "./chatReducer";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const logInDone = useCallback(
    (uid) => dispatch(actionCreators.logInDone(uid)),
    [dispatch]
  );

  const setUsers = useCallback(
    (users) => {
      dispatch(actionCreators.setUsers(users));
    },
    [dispatch]
  );

  return (
    <ChatContext.Provider value={{ ...state, logInDone, setUsers }}>
      {children}
    </ChatContext.Provider>
  );
};
