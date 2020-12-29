import { createContext, useCallback, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { tokenizedRequest, tokenlessRequest } from "../helpers/requests";
import { ChatContext } from "./chat/ChatContext";

export const AuthContext = createContext();

const ACTIONS = {
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_DONE: "REGISTER_DONE",
  REGISTER_FAILED: "REGISTER_FAILED",
  LOG_IN_REQUEST: "LOG_IN_REQUEST",
  LOG_IN_DONE: "LOG_IN_DONE",
  LOG_IN_FAILED: "LOG_IN_FAILED",
  USER_LOG_OUT: "USER_LOG_OUT",
  VERIFICATION_REQUEST: "VERIFICATION_REQUEST",
  VERIFICATION_DONE: "VERIFICATION_DONE",
  VERIFICATION_FAILED: "VERIFICATION_FAILED",
};

const initialState = {
  logged: false,
  verified: false,
  pending: false,
  registrationPending: false,
  verificationPending: true,
  uid: null,
  name: null,
  email: null,
};

const reducer = (state, { type, payload }) => {
  const reducersForType = {
    [ACTIONS.REGISTER_REQUEST]: () => ({
      registrationPending: true,
    }),
    [ACTIONS.REGISTER_DONE]: () => ({
      logged: true,
      registrationPending: false,
      uid: payload.user?.uid,
      name: payload.user?.name,
      email: payload.user?.email,
    }),
    [ACTIONS.REGISTER_FAILED]: () => ({
      ...initialState,
      pending: state.pending,
    }),
    [ACTIONS.LOG_IN_REQUEST]: () => ({
      pending: true,
    }),
    [ACTIONS.LOG_IN_DONE]: () => ({
      logged: true,
      pending: false,
      uid: payload.user?.uid,
      name: payload.user?.name,
      email: payload.user?.email,
    }),
    [ACTIONS.LOG_IN_FAILED]: () => ({
      ...initialState,
      registrationPending: state.registrationPending,
      verificationPending: false,
    }),
    [ACTIONS.USER_LOG_OUT]: () => ({
      ...initialState,
      registrationPending: state.registrationPending,
      verificationPending: false,
    }),
    [ACTIONS.VERIFICATION_REQUEST]: () => ({
      verificationPending: true,
    }),
    [ACTIONS.VERIFICATION_DONE]: () => ({
      logged: true,
      verified: true,
      pending: false,
      verificationPending: false,
      uid: payload.user?.uid,
      name: payload.user?.name,
      email: payload.user?.email,
    }),
    [ACTIONS.VERIFICATION_FAILED]: () => ({
      ...initialState,
      verificationPending: false,
      verified: false,
    }),
  };

  return reducersForType[type]
    ? {
        ...state,
        ...reducersForType[type](),
      }
    : state;
};

export const AuthProvider = ({ children }) => {
  const { logInDone } = useContext(ChatContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async ({ name, email, password }) => {
    dispatch({
      type: ACTIONS.REGISTER_REQUEST,
      payload: {},
    });
    const { data: resData } = await tokenlessRequest(
      "/api/login/register",
      { name, email, password },
      "POST"
    );
    if (resData.success) {
      const { token, user } = resData;
      localStorage.setItem("token", token);
      dispatch({
        type: ACTIONS.REGISTER_DONE,
        payload: { user },
      });
      logInDone(user.uid);
    } else {
      dispatch({
        type: ACTIONS.REGISTER_FAILED,
        payload: {},
      });
      Swal.fire(
        "Error",
        resData.msg || "Review email and password are valid",
        "error"
      );
    }
  };

  const logIn = async ({ email, password }) => {
    dispatch({
      type: ACTIONS.LOG_IN_REQUEST,
      payload: {},
    });
    const { data: resData } = await tokenlessRequest(
      "/api/login",
      { email, password },
      "POST"
    );
    if (resData.success) {
      const { token, user } = resData;
      localStorage.setItem("token", token);
      dispatch({
        type: ACTIONS.LOG_IN_DONE,
        payload: { user },
      });
      logInDone(user.uid);
    } else {
      dispatch({
        type: ACTIONS.LOG_IN_FAILED,
        payload: {},
      });
      Swal.fire("Error", resData.msg || "Review email and password", "error");
    }
  };

  const logOut = () => {
    // goToLogin();
    localStorage.removeItem("token");
    dispatch({
      type: ACTIONS.USER_LOG_OUT,
      payload: {},
    });
    logInDone(null);
  };

  const verifyToken = useCallback(async () => {
    dispatch({
      type: ACTIONS.VERIFICATION_REQUEST,
      payload: {},
    });
    const token = localStorage.getItem("token");
    if (token) {
      const { data: resData } = await tokenizedRequest("/api/login/renew");
      if (resData?.success) {
        logInDone(resData.user?.uid);
        return dispatch({
          type: ACTIONS.VERIFICATION_DONE,
          payload: { user: resData.user },
        });
      }
    }
    dispatch({
      type: ACTIONS.VERIFICATION_FAILED,
      payload: {},
    });
    logInDone(null);
  }, [logInDone]);

  return (
    <AuthContext.Provider
      value={{ ...state, register, logIn, logOut, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
