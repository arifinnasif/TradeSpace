import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Layout from "../layout/Layout";

import ChatHeader from "../components/Chats/ChatHeader";
import Divider from "../components/Chats/Divider";
import ChatBox from "../components/Chats/ChatBox";
import InputBox from "../components/Chats/InputBox";
import ChatSideBar from "../components/Chats/ChatSideBar";

import { MessageType, InboxType, getMessages } from "../services/chat.service";
import { getInbox } from "../services/chat.service";
import { set } from "lodash";

const GetChats = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [inbox, setInbox] = useState<InboxType[]>([]);

  const [currentThread, setCurrentThread] = useState<string>("");

  const [adTitle, setAdTitle] = useState<string>("");
  const [adImage, setAdImage] = useState<string>("");
  const [adPrice, setAdPrice] = useState<number>(0);
  const [receiverUsername, setReceiverUsername] = useState<string>("");
  const [receiverFullname, setReceiverFullname] = useState<string>("");
  const [adId, setAdId] = useState<number>(0);
  const [currInbox, setCurrInbox] = useState<InboxType>();
  // const [threadChanged, setThreadChanged] = useState<boolean>(false);

  // const handleSendMessage = (message: MessageType) => {
  //     setMessages([...messages, message]);
  // };

  useEffect(() => {
    // fetch threads from backend

    async function fetchData(callback?: (arg: InboxType) => Promise<void>) {
      try {
        const response = await getInbox();
        console.log("Inbox");
        console.log(response);
        setInbox(response);

        setCurrInbox(response[0]); // required for input box to know current thread
        // then input box can modify the current thread's card's last message
        // no new api call required then

        if (callback) await callback(response[0]);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchAndLoadThread(arg: InboxType) {
      setIsLoading(true);
      setCurrentThread(arg.thread_id);
      setAdTitle(arg.ad_title);
      setAdImage(arg.ad_image);
      setAdPrice(arg.ad_price);
      setReceiverUsername(arg.receiver_username);
      setReceiverFullname(arg.receiver_fullname);
      setAdId(arg.ad_id);
      const response = await getMessages(arg.thread_id);
      console.log("Messages");
      console.log(response);
      setMessages(response);
      setIsLoading(false);
    }

    fetchData(fetchAndLoadThread);
  }, []);

  // continously poll for new messages
  useEffect(() => {
    const interval = setInterval(async () => {
      if (currentThread) {
        const message_response = await getMessages(currentThread);
        // check if response is different from current messages
        // if (Number(response.length) !== messages.length) {
        setMessages(message_response);
        // }
        const inbox_response = await getInbox();
        setInbox(inbox_response);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentThread]);

  return (
    <Layout title="Chats" loading={isLoading}>
      <Grid height={"100vh"} templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={2} height="90%" width="100%">
          <Flex
            w="100%"
            h="100%"
            justify="center"
            align="center"
            overflow={"scroll"}
          >
            <Flex w="90%" h="90%" flexDir="column">
              <ChatSideBar
                inbox={inbox}
                setInbox={setInbox}
                messages={messages}
                setMessages={setMessages}
                setCurrentThread={setCurrentThread}
                setAdTitle={setAdTitle}
                setAdImage={setAdImage}
                setAdPrice={setAdPrice}
                setReceiverUsername={setReceiverUsername}
                setReceiverFullname={setReceiverFullname}
                currInbox={currInbox}
                setCurrInbox={setCurrInbox}
              />

              {/* <div>
                            <h1>Sidebar</h1>
                        </div> */}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} height="100vh">
          <Flex w="100%" h="100vh" align="left">
            <Flex h="90%" flexDir="column" w="90%" padding="1rem">
              <ChatHeader
                adTitle={adTitle}
                adImage={adImage}
                adPrice={adPrice}
                receiverUsername={receiverUsername}
                receiverFullname={receiverFullname}
              />

              <Divider />

              <ChatBox messages={messages} />

              <InputBox
                messages={messages}
                setMessages={setMessages}
                currentThread={currentThread}
                currInbox={currInbox}
                setCurrInbox={setCurrInbox}
              />

              {/* <div>
                            <h1>Chats</h1>
                        </div> */}
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default GetChats;
