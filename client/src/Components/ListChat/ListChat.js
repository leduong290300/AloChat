import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";

import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import ChatLoading from "../ChatLoading/ChatLoading";
import GroupchatModal from "../Modal/GroupchatModal";
import { getSender } from "../../Utils/getSender";

export default function ListChat() {
  const { selectedChat, setSelectedChat, chats, fetchChats, fetchAgain } =
    useContext(ChatContext);

  const [loggedUser, setLoggedUser] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    setLoggedUser(localStorage.getItem("user_id"));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {t("my_chat")}
        <GroupchatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            {t("create_chat")}
          </Button>
        </GroupchatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.lastMessage && (
                  <Text fontSize="xs">
                    <b>{chat.lastMessage.sender.name} : </b>
                    {chat.lastMessage.content.length > 50
                      ? chat.lastMessage.content.substring(0, 51) + "..."
                      : chat.lastMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}
