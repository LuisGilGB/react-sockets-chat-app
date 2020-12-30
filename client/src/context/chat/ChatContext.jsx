import { createContext, useCallback, useReducer } from "react";
import { tokenizedRequest } from "../../helpers/requests";
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

  const receiveMessage = useCallback((message) => {
    dispatch(actionCreators.receiveMessage(message));
  }, []);

  const loadMessages = useCallback(async (uid) => {
    try {
      dispatch(actionCreators.loadMessages());
      const res = await tokenizedRequest(`/api/messages/${uid}`);
      dispatch(actionCreators.loadMessagesDone(res.data.messages));
    } catch {
      dispatch(actionCreators.loadMessagesFailed());
    }
  }, []);

  const selectChat = useCallback(
    (uid) => {
      if (uid !== state.activeChat) {
        dispatch(actionCreators.selectChat(uid));
        loadMessages(uid);
      }
    },
    [state.activeChat, loadMessages]
  );

  return (
    <ChatContext.Provider
      value={{
        ...state,
        logInDone,
        setUsers,
        selectChat,
        receiveMessage,
        loadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
