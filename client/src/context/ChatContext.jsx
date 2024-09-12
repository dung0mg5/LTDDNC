import {useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import {getChats} from '../services/apiChat';
import React from 'react';

export const ChatContext = createContext();

export default function ChatProvider({children}) {
  const [selectedChat, setSelectedChat] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  const fetchChats = async function () {
    setIsLoading(true);
    const {errorMessage, data} = await getChats();
    if (errorMessage) return;

    setIsLoading(false);
    setChats(data.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        fetchChats,
        isLoading,
        setIsLoading,
        selectedChat,
        setSelectedChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
