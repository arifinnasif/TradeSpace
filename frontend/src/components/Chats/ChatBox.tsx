import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

import { MessageType } from "../../services/Chat.service";



function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  // console.log(date);

  // console.log(date);
  // const hours = date.getHours();
  // console.log(hours);
  // const minutes = date.getMinutes();
  // console.log(minutes);
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  // const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
  // return `${formattedTime} of ${date.toDateString()}`;

  const formattedTime = date.toLocaleString('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });


  return formattedTime;
}




const ChatBox = ({ messages }: 
                 { messages  : MessageType[] }
                 ) => {

  return (
    <Flex w="100%" 
          h="80%" 
          overflowY="scroll" 
          flexDirection="column" 
          p="3" 
          background={"teal.50"}
    >
      {messages.map((item, index) => {
        if (item.is_my_message) {
          return (
            <Flex key={index} 
                  flexDirection={"column"}
                  maxW="-50%"
                  width="fit-content" 
                  justifyContent="flex-end"
                  marginLeft="auto"
            >
              <Flex
                bg="blue.500"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                rounded={10}
              >
                <Text>{item.message}</Text>
              </Flex>
              <Flex justifyContent="flex-start">
                <Text fontSize="xs" 
                      color="gray.500" 
                      align={"right"}
                >
                  {formatTimestamp(item.timestamp)}
                </Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index}
                  maxW="50%"
                  width={"fit-content"}
                  flexDirection={"column"} 
            >
              <Flex justifyContent="flex-start" 
                    flexDirection={"row"}
              >
                <Avatar
                  name={item.sender_username}
                  border="2px solid green"
                />
                <Flex
                  bg="gray.100"
                  color="black"
                  minW="100px"
                  maxW="350px"
                  justifyContent="center"
                  alignItems="center"
                  marginLeft="2"
                  rounded={10}
                  p="3"
                >
                  <Text>{item.message}</Text>
                </Flex>
              </Flex>
              <Flex justifyContent="flex-end">
                <Text fontSize="xs" 
                      color="gray.500" 
                      align={"right"}
                >
                  {formatTimestamp(item.timestamp)}
                </Text>
              </Flex>
            </Flex>
          );
        }
      })}
    </Flex>
  );
};

export default ChatBox;
