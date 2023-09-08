import UserCard from "./UserCard";

import { InboxType } from "../../services/chat.service";
import { Flex } from "@chakra-ui/react";

const ChatSideBar = ({
  inbox,
  setInbox,
}: {
  inbox: InboxType[];
  setInbox: React.Dispatch<React.SetStateAction<InboxType[]>>;
}) => {
  return (
    <Flex flexDirection="column" justifyContent={"space-between"}>
      {inbox.map((inboxItem) => (
        <UserCard key={inboxItem.thread_id} inboxItem={inboxItem} />
      ))}
    </Flex>
  );
};

export default ChatSideBar;
