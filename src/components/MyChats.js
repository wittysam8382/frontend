import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button, useToast } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import { Text } from "@chakra-ui/layout";
import GroupChatModal from "./miscellaneous/GroupChatModal";
const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, user, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

 const fetchChats = async () => {
   // console.log(user._id);
   try {
     const config = {
       headers: {
         Authorization: `Bearer ${user.token}`,
       },
     };

     const { data } = await axios.get("/api/chat", config);
     setChats(data);
   } catch (error) {
     toast({
       title: "Error Occured!",
       description: "Failed to Load the chats",
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "bottom-left",
     });
   }
 };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      opacity={0.8}
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display="flex"
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New GroupChat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#BE8EB8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#4B71AA" : "#96bbf2"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
