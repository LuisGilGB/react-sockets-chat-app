import { createContext, useCallback, useReducer } from "react";
import Swal from "sweetalert2";
import { tokenlessRequest } from "../helpers/requests";

export const AuthContext = createContext();

const ACTIONS = {
  USER_LOG_IN: "USER_LOG_IN",
  USER_LOG_OUT: "USER_LOG_OUT",
};

const initialState = {
  logged: false,
  uid: null,
  name: null,
  email: null,
};

const reducer = (state, { type, payload }) => {
  const reducersForType = {
    [ACTIONS.USER_LOG_IN]: () => ({
      logged: true,
      name: payload.name,
    }),
    [ACTIONS.USER_LOG_OUT]: () => initialState,
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

  const register = ({ name, email, password }) => {};

  const logIn = async ({ email, password }) => {
    const { data: resData } = await tokenlessRequest(
      "/api/login",
      { email, password },
      "POST"
    );
    if (resData.success) {
      const { token, user } = resData;
      localStorage.setItem("token", token);
      dispatch({
        type: ACTIONS.USER_LOG_IN,
        payload: { user },
      });
    } else {
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
