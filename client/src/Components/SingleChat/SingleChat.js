import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { UserContext } from "../../Context/UserContext";
import { getSender, getSenderFull } from "../../Utils/getSender";
import ProfileModal from "../Modal/ProfileModal";
import GroupchatUpdateModal from "../Modal/GroupchatUpdateModal";
import "./SingleChat.css";
import ListMessage from "../ListMessage/ListMessage";

export default function SingleChat() {
  const {
    selectedChat,
    setSelectedChat,
    handleSendMessage,
    handleFetchMessage,
  } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { t } = useTranslation();
  const toast = useToast();
  const {
    authState: { user },
  } = useContext(UserContext);

  //Tải tin nhắn từ database
  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      await handleFetchMessage(selectedChat._id);
      setLoading(false);
    } catch (error) {
      toast({
        title: `${t("error_search_title")}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);

  //Gửi tin nhắn
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        await handleSendMessage({
          content: newMessage,
          chatId: selectedChat._id,
        });
      } catch (error) {
        toast({
          title: `${t("error_search_title")}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <GroupchatUpdateModal fetchMessage={fetchMessage} />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            p={3}
            bg="#e8e8e8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
          >
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="message">
                <ListMessage />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              mt={3}
              position="absolute"
              style={{ left: "25px", bottom: "20px", width: "95%" }}
            >
              <Input
                variant="filled"
                bg="#e0e0e0"
                value={newMessage}
                onChange={handleOnChange}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="30px" pb={3} fontFamily="Worrk sans">
            Hello
          </Text>
        </Box>
      )}
    </>
  );
}
