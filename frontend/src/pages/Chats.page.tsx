import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Layout from "../layout/Layout";

import ChatHeader from "../components/Chats/ChatHeader";
import Divider from "../components/Chats/Divider";
import ChatBox from "../components/Chats/ChatBox";
import InputBox from "../components/Chats/InputBox";
import ChatSideBar from "../components/Chats/ChatSideBar";

import { MessageType, InboxType } from "../services/chat.service";
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

  // const handleSendMessage = (message: MessageType) => {
  //     setMessages([...messages, message]);
  // };

  useEffect(() => {
    // fetch threads from backend

    async function fetchData() {
      try {
        const response = await getInbox();
        console.log("Inbox");
        console.log(response);
        setInbox(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // How to set messages initial state?
    // upto u. u can show an empty box if u want
    // right now there is dummy

    setMessages([
      {
        sender_username: "alice",
        receiver_username: "bob",
        message:
          "hello world blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah    blah blahblah blah blah blah blah blah blah blah blah",
        timestamp: "2023-07-13 14:28:39",
        is_image: false,
        is_read_by_receiver: false,
        is_my_message: false,
      },
      {
        sender_username: "bob",
        receiver_username: "alice",
        message: "//placekitten.com/600/400",
        timestamp: "2023-07-13 14:28:30",
        is_image: true,
        is_read_by_receiver: true,
        is_my_message: true,
      },
      {
        sender_username: "alice",
        receiver_username: "bob",
        message:
          "hello world blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah    blah blahblah blah blah blah blah blah blah blah blah",
        timestamp: "2023-07-13 14:28:39",
        is_image: false,
        is_read_by_receiver: false,
        is_my_message: false,
      },
      {
        sender_username: "bob",
        receiver_username: "alice",
        message: "//placekitten.com/600/400",
        timestamp: "2023-07-13 14:29:30",
        is_image: true,
        is_read_by_receiver: true,
        is_my_message: true,
      },
    ]);
  }, []);

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
                setMessages={setMessages}
                setCurrentThread={setCurrentThread}
                setAdTitle={setAdTitle}
                setAdImage={setAdImage}
                setAdPrice={setAdPrice}
                setReceiverUsername={setReceiverUsername}
                setReceiverFullname={setReceiverFullname}
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
