import React from "react";

import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW="x1" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={4}
        bg={"#FFD9FF"}
        w="40%"
        m="100px 0 15px 0"
        pb="10px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="#3B3663">
          Chit-Chat
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"40%"}
        p={4}
        m="75px 1 15px 0"
        borderRadius={"lg"}
        color={"3B3663"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded" colorScheme="pink">
          <TabList>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
