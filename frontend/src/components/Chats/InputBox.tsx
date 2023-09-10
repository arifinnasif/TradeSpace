import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { MessageType, InboxType, sendMessage } from "../../services/chat.service";

const InputBox = ({
  messages,
  setMessages,
  currentThread,
  currInbox,
  setCurrInbox,
}: {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  currentThread: string;
  currInbox: InboxType | undefined;
  setCurrInbox: React.Dispatch<React.SetStateAction<InboxType | undefined>>;
}) => {
  const [inputMessage, setInputMessage] = React.useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim().length <= 0) return;
    const newMessage: MessageType = {
      sender_username: "bob",
      receiver_username: "alice",
      message: inputMessage,
      // current time in Bangladesh
      timestamp: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      is_image: false,
      is_read_by_receiver: false,
      is_my_message: true,
    };
    setMessages([...messages, newMessage]);
    // update last message of current thread
    if (currInbox) {
      currInbox.last_message.message = inputMessage;
      currInbox.last_message.timestamp = newMessage.timestamp;
    }
    try {
      await sendMessage(currentThread, inputMessage, false);
    } catch (err) {
      console.log(err);
    }
    
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
