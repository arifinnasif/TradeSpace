import UserCard from "./UserCard";

import { InboxType, MessageType } from "../../services/chat.service";
import { Flex } from "@chakra-ui/react";

const ChatSideBar = ({
  inbox,
  setInbox,
  messages,
  setMessages,
  setCurrentThread,
  setAdTitle,
  setAdImage,
  setAdPrice,
  setReceiverUsername,
  setReceiverFullname,
  currInbox,
  setCurrInbox,
}: {
  inbox: InboxType[];
  setInbox: React.Dispatch<React.SetStateAction<InboxType[]>>;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setCurrentThread: React.Dispatch<React.SetStateAction<string>>;
  setAdTitle: React.Dispatch<React.SetStateAction<string>>;
  setAdImage: React.Dispatch<React.SetStateAction<string>>;
  setAdPrice: React.Dispatch<React.SetStateAction<number>>;
  setReceiverUsername: React.Dispatch<React.SetStateAction<string>>;
  setReceiverFullname: React.Dispatch<React.SetStateAction<string>>;
  currInbox: InboxType | undefined;
  setCurrInbox: React.Dispatch<React.SetStateAction<InboxType | undefined>>;
}) => {
  return (
    <Flex flexDirection="column" justifyContent={"space-between"}>
      {inbox.map((inboxItem) => (
        <UserCard
          key={inboxItem.thread_id}
          inboxItem={inboxItem}
          messages={messages}
          setMessages={setMessages}
          setCurrentThread={setCurrentThread}
          setAdTitle={setAdTitle}
          setAdImage={setAdImage}
          setAdPrice={setAdPrice}
          setReceiverUsername={setReceiverUsername}
          setReceiverFullname={setReceiverFullname}
          setCurrInbox={setCurrInbox}
        />
      ))}
    </Flex>
  );
};

export default ChatSideBar;
