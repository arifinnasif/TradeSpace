import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { MessageType } from "../../services/Chat.service";

const InputBox = ({ messages,
                    setMessages,
                  }:{ 
                    messages : MessageType[] ,
                    setMessages : React.Dispatch<React.SetStateAction<MessageType[]>>,
                 }) => {

const [inputMessage, setInputMessage] = React.useState("");


const handleSendMessage = () => {
    if (inputMessage.trim().length <= 0) return;
    const newMessage: MessageType = {
        sender_username: "bob",
        receiver_username: "alice",
        message: inputMessage,
        // current time in Bangladesh
        timestamp: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Dhaka',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }),
        is_image: false,
        is_read_by_receiver: false,
        is_my_message: true,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
};

  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="1px solid black"
        borderRadius="5"
        _focus={{
          border: "1px solid black",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="green.700"
        color="white"
        borderRadius="5"
        marginLeft="2"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default InputBox;
