import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (serverHost) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketConnection = io.connect(serverHost, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });
    setSocket(socketConnection);
  }, [serverHost]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => {
      setOnline(true);
    });
    return () => {
      socket?.off("connect");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => {
      setOnline(false);
    });
    return () => {
      socket?.off("disconnect");
    };
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};

export default useSocket;
