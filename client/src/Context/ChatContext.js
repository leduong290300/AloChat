import { createContext, useState } from "react";
import axios from "axios";

import { apiUrl } from "../Api/Api";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [results, setResults] = useState([]);
  const [chats, setChats] = useState([]);

  // Chọn người để trò chuyển
  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(`${apiUrl}/chat/access`, { userId });
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Tải tin nhắn
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/chat`);
      if (data) return setChats(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  //Tìm kiếm người dùng để thêm vào nhóm
  const getUsers = async (query) => {
    try {
      const { data } = await axios.get(`${apiUrl}/user/search?search=${query}`);
      setResults(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  //Tạo nhóm chat
  const createGroupChat = async (value) => {
    try {
      const { data } = await axios.post(`${apiUrl}/chat/group`, value);
      setChats([data.fullGroupChat, ...chats]);
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
    getUsers,
    results,
    createGroupChat,
  };
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};
export default ChatProvider;
