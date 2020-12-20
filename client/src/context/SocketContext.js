import { createContext } from "react";
import useSocket from "../hooks/useSocket";

const SOCKET_SERVER_HOST =
  process.env.SOCKET_SERVER_HOST || "http://localhost:8080";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket(SOCKET_SERVER_HOST);
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
