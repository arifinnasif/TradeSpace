import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { MessageType } from "../../services/Chat.service";

const InputBox = () => {

const [inputMessage, setInputMessage] = React.useState("");


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
            // handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="5"
        marginLeft="2"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        // onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default InputBox;
