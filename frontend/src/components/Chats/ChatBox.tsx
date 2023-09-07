import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

import { MessageType } from "../../services/Chat.service";


const ChatBox = ({ messages }: 
                 { messages  : MessageType[] }
                 ) => {

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.is_my_message) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name={item.sender_username}
                border="2px solid green"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                justifyContent="center"
                alignItems="center"
                marginLeft="2"
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
    </Flex>
  );
};

export default ChatBox;
