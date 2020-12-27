import { createContext, useCallback, useReducer } from "react";
import Swal from "sweetalert2";
import { tokenlessRequest } from "../helpers/requests";

export const AuthContext = createContext();

const ACTIONS = {
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_DONE: "REGISTER_DONE",
  REGISTER_FAILED: "REGISTER_FAILED",
  LOG_IN_REQUEST: "LOG_IN_REQUEST",
  LOG_IN_DONE: "LOG_IN_DONE",
  LOG_IN_FAILED: "LOG_IN_FAILED",
  USER_LOG_OUT: "USER_LOG_OUT",
};

const initialState = {
  logged: false,
  pending: false,
  registrationPending: false,
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
    }),
    [ACTIONS.USER_LOG_OUT]: () => ({
      ...initialState,
      registrationPending: state.registrationPending,
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
    dispatch({
      type: ACTIONS.USER_LOG_OUT,
      payload: {},
    });
  };

  const verifyToken = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ ...state, register, logIn, logOut, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};