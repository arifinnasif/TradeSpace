import UserCard from "./UserCard";


import { InboxType } from "../../services/Chat.service";


const ChatSideBar = ({
                        inbox, 
                        setInbox
                     } 
                    : 
                    {
                        inbox: InboxType[], 
                        setInbox: React.Dispatch<React.SetStateAction<InboxType[]>>
                    }) => {
    return(
        <>
            {inbox.map((inboxItem) => (
                <UserCard 
                    key={inboxItem.thread_id}
                    inboxItem={inboxItem}
                />
            ))}
            <UserCard />
        </>
    )
}

export default ChatSideBar;