import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import {
  InboxType,
  MessageType,
  getMessages,
} from "../../services/chat.service";

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  // console.log(date);

  // console.log(date);
  // const hours = date.getHours();
  // console.log(hours);
  // const minutes = date.getMinutes();
  // console.log(minutes);
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  // const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  // return `${formattedTime} of ${date.toDateString()}`;

  const formattedTime = date.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
}

const UserCard = ({
  inboxItem,
  messages,
  setMessages,
  setCurrentThread,
  setAdTitle,
  setAdImage,
  setAdPrice,
  setReceiverUsername,
  setReceiverFullname,
  setCurrInbox,
}: {
  inboxItem: InboxType;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setCurrentThread: React.Dispatch<React.SetStateAction<string>>;
  setAdTitle: React.Dispatch<React.SetStateAction<string>>;
  setAdImage: React.Dispatch<React.SetStateAction<string>>;
  setAdPrice: React.Dispatch<React.SetStateAction<number>>;
  setReceiverUsername: React.Dispatch<React.SetStateAction<string>>;
  setReceiverFullname: React.Dispatch<React.SetStateAction<string>>;
  setCurrInbox: React.Dispatch<React.SetStateAction<InboxType | undefined>>;
}) => {
  const handleOpenChat = async (event: React.MouseEvent<HTMLDivElement>) => {
    setCurrInbox(inboxItem);
    console.log("Open chat");
    const cardId = event.currentTarget.id;
    console.log("Clicked card with id:", cardId);
    const respose = await getMessages(inboxItem.thread_id);
    console.log(respose);
    setMessages(respose);
    setCurrentThread(inboxItem.thread_id);
    setAdTitle(inboxItem.ad_title);
    setAdImage(inboxItem.ad_image);
    setAdPrice(inboxItem.ad_price);
    setReceiverUsername(inboxItem.receiver_username);
    setReceiverFullname(inboxItem.receiver_fullname);
  };

  console.log("Inbox item:");
  console.log(inboxItem);

  return (
    <Card
      as={Link}
      id={inboxItem.thread_id}
      direction="row"
      // overflow="hidden"
      variant="unstyled"
      width="100%"
      height="fit-content"
      marginBottom={2}
      // print the id of the card when clicked
      onClick={(event) => {
        handleOpenChat(event);
      }}
      backgroundColor={
        inboxItem.unread_messages_count > 0 ? "gray.200" : "white"
      }
    >
      <Image
        objectFit="cover"
        maxW={{ base: "25%" }}
        // src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'

        src={
          inboxItem.receiver_profile_pic ||
          "https://hdfs.uconn.edu/wp-content/uploads/sites/601/2020/12/person-icon-grey-e1666368313834.jpg"
        }
        alt="user profile pic"
      />

      <Flex
        flexDirection="column"
        justifyContent="space-between"
        width="fit-content"
      >
        <CardBody padding={2}>
          <Text fontSize="xl" fontWeight="bold">
            {inboxItem.receiver_fullname}
          </Text>
          <Text fontSize="lg" fontWeight="semibold">
            {inboxItem.ad_title}
          </Text>
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontSize="md" marginRight={2}>
              {inboxItem.last_message.message}
            </Text>
            <Text fontSize="md" textColor={"gray.500"}>
              -{formatTimestamp(inboxItem.last_message.timestamp)}
            </Text>
          </Flex>
        </CardBody>

        {/* <CardFooter>
                <Button variant='solid' colorScheme='blue'>
                    Buy Latte
                </Button>
                </CardFooter> */}
      </Flex>
    </Card>

    // <div>
    //     <h1>UserCard</h1>
    // </div>
  );
};

export default UserCard;
