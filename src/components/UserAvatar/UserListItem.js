import React from 'react'
import {Box} from "@chakra-ui/layout";
// import { ChatState }  from "../../Context/ChatProvider";
import { Avatar, Text } from '@chakra-ui/react';
const UserListItem = ( { user, handleFunction} ) => {
  //  const { user } = ChatState();
  return (
    
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg={"#ffd9ff"}
      _hover={{
        background: "#3b3663",
        color: "white"
      }}
      w={"100%"}
      display={"flex"}
      alignItems = "center"
      px={3}
      py={2}
      mb={2}
      borderRadius = 'lg'
    >
        <Avatar
            mr={2}
            size={"sm"}
            cursor={"pointer"}
            name={user.name}
            src={user.pic}
        />
        <Box>
           <Text>{user.name}</Text> 
           <Text fontSize="xs">
            <b>Email: </b>
            {user.email}
           </Text>
        </Box>
    </Box>
  );
}

export default UserListItem;