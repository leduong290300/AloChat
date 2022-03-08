import { createContext, useState } from "react";
import axios from "axios";

import { apiUrl } from "../Api/Api";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(`${apiUrl}/chat/access`, { userId });
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/chat`);
      if (data) return setChats(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    accessChat,
    fetchChats,
  };
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};
export default ChatProvider;
