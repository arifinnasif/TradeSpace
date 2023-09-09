import UserCard from "./UserCard";

import { InboxType, MessageType } from "../../services/chat.service";
import { Flex } from "@chakra-ui/react";

const ChatSideBar = ({
  inbox,
  setInbox,
  setMessages,
  setCurrentThread,
  setAdTitle,
  setAdImage,
  setAdPrice,
  setReceiverUsername,
  setReceiverFullname,
}: {
  inbox: InboxType[];
  setInbox: React.Dispatch<React.SetStateAction<InboxType[]>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setCurrentThread: React.Dispatch<React.SetStateAction<string>>;
  setAdTitle: React.Dispatch<React.SetStateAction<string>>;
  setAdImage: React.Dispatch<React.SetStateAction<string>>;
  setAdPrice: React.Dispatch<React.SetStateAction<number>>;
  setReceiverUsername: React.Dispatch<React.SetStateAction<string>>;
  setReceiverFullname: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Flex flexDirection="column" justifyContent={"space-between"}>
      {inbox.map((inboxItem) => (
        <UserCard
          key={inboxItem.thread_id}
          inboxItem={inboxItem}
          setMessages={setMessages}
          setCurrentThread={setCurrentThread}
          setAdTitle={setAdTitle}
          setAdImage={setAdImage}
          setAdPrice={setAdPrice}
          setReceiverUsername={setReceiverUsername}
          setReceiverFullname={setReceiverFullname}
        />
      ))}
    </Flex>
  );
};

export default ChatSideBar;
