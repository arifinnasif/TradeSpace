import UserCard from "./UserCard";

import { InboxType, MessageType } from "../../services/chat.service";
import { Flex } from "@chakra-ui/react";

const ChatSideBar = ({
  inbox,
  setInbox,
  setMessages,
}: {
  inbox: InboxType[];
  setInbox: React.Dispatch<React.SetStateAction<InboxType[]>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}) => {
  return (
    <Flex flexDirection="column" justifyContent={"space-between"}>
      {inbox.map((inboxItem) => (
        <UserCard
          key={inboxItem.thread_id}
          inboxItem={inboxItem}
          setMessages={setMessages}
        />
      ))}
    </Flex>
  );
};

export default ChatSideBar;
