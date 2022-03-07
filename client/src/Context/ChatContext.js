import { createContext, useState } from "react";
import axios from "axios";

import { apiUrl } from "../Api/Api";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const accessChat = async (userId) => {
    try {
      const response = await axios.post(`${apiUrl}/chat`, userId);

      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const fetchChats = async () => {
    try {
      const response = axios.get(`${apiUrl}/chat`);
      if (response.data.success) return setChats(response.data);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
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
