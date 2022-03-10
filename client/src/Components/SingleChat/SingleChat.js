import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { UserContext } from "../../Context/UserContext";
import { getSender, getSenderFull } from "../../Utils/getSender";
import ProfileModal from "../Modal/ProfileModal";
import GroupchatUpdateModal from "../Modal/GroupchatUpdateModal";
export default function SingleChat() {
  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  const {
    authState: { user },
  } = useContext(UserContext);

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
                <GroupchatUpdateModal />
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
          ></Box>
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
