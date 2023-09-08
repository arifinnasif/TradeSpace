import UserCard from "./UserCard";

import { InboxType, MessageType } from "../../services/chat.service";
import { Flex } from "@chakra-ui/react";

const ChatSideBar = ({
  inbox,
  setInbox,
  setMessages,
  setCurrentThread,
}: {
  inbox: InboxType[];
  setInbox: React.Dispatch<React.SetStateAction<InboxType[]>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setCurrentThread: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Flex flexDirection="column" justifyContent={"space-between"}>
      {inbox.map((inboxItem) => (
        <UserCard
          key={inboxItem.thread_id}
          inboxItem={inboxItem}
          setMessages={setMessages}
          setCurrentThread={setCurrentThread}
        />
      ))}
    </Flex>
  );
};

export default ChatSideBar;
