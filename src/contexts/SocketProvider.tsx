import React, { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const chatBackendUrl = "https://mockapi.harishb167.serv00.net";

type SocketProviderProps = {
  id: string;
  children: React.ReactNode;
};

const SocketContext = React.createContext<Socket | undefined>(undefined);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ id, children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(chatBackendUrl, { query: { id } });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
