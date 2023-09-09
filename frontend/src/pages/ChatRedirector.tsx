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
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  // const handleSendMessage = (message: MessageType) => {
  //     setMessages([...messages, message]);
  // };

  async function fetchInbox(callback?: (arg: InboxType) => Promise<void>) {
    try {
      const response = await getInbox();
      console.log("Inbox");
      console.log(response);
      setInbox(response);
      navigate(`/chat/${response[0].thread_id}`);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // fetch threads from backend

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

    fetchInbox(fetchAndLoadThread);
  }, []);

  return <></>;
};

export default GetChats;
