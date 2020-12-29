import { createContext, useContext, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";

const SOCKET_SERVER_HOST =
  process.env.SOCKET_SERVER_HOST || "http://localhost:8080";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    SOCKET_SERVER_HOST
  );

  useEffect(() => {
    if (logged) {
      connectSocket();
    }
  }, [logged, connectSocket]);

  useEffect(() => {
    if (!logged) {
      disconnectSocket();
    }
  }, [logged, disconnectSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
