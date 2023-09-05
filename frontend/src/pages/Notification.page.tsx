import { useEffect, useState } from "react";

import Layout from "../layout/Layout";

import {  Box, 
          Card, 
          Center, 
          Flex, 
          Stack,
          useColorModeValue,
          Heading,
          CardHeader,
          CardBody,
          StackDivider,
          Text
} from "@chakra-ui/react";

import { notificationService,
         NotificationType
 } from "../services/Notification.service";


// const notifications = 
//   [
//     {
//       "id": 1,
//       "username": "Sheam1805099",
//       "type": "promotion",
//       "title": "your platinum promotion has expired",
//       "description": "the promotion that u purchased has expired",
//       "createdAt": "2023-08-17T22:36:57.568Z"
//     },
//     {
//       "id": 2,
//       "username": "Sheam1805099",
//       "type": "promotion",
//       "title": "your platinum promotion has expired",
//       "description": "the promotion that u purchased has expired",
//       "createdAt": "2023-08-15T12:36:57.568Z"
//     },
//   ]


function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  console.log(date);

  // console.log(date);
  // const hours = date.getHours();
  // console.log(hours);
  // const minutes = date.getMinutes();
  // console.log(minutes);
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  // const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
  // return `${formattedTime} of ${date.toDateString()}`;

  const formattedTime = date.toLocaleString('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });


  return formattedTime;
}


// this works for timestamp type 2023-08-15 12:36:57.568Z
// might need later in future
// function formatTimestamp(timestamp: string) {
//   console.log(timestamp);
//   // Split the timestamp into date and time parts
//   const [datePart, timePart] = timestamp.split(' ');
//   const [year, month, day] = datePart.split('-');
//   const [hour, minute, second] = timePart.split(':');

//   // Create a new Date object with the parsed components
//   const formattedDate = new Date(
//     parseInt(year),
//     parseInt(month) - 1, // Months are zero-based
//     parseInt(day),
//     parseInt(hour),
//     parseInt(minute),
//     parseFloat(second)
//   );

//   // Format the date and time
//   const formattedTime = formattedDate.toLocaleString('en-US', {
//     timeZone: 'UTC',
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   });

//   console.log(formattedTime);
//   return formattedTime;
// }



const GetNotifications = () => {


  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>();
  
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const notifications = await notificationService.getNotifications();
      setNotifications(notifications);
      setIsLoading(false);
    }
    fetchData();
  }
  , []);


  useEffect(() => {
    async function setSeen() {
      await notificationService.updateNotificationSeenStatus();
    }
    setSeen();
  }
  , []);
  
  
  
  return(
    <>
      <Layout title="Hello" loading={isLoading}>
        <Flex
          minW={"85vw"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("teal.50", "gray.800")}
        >

          <Stack
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
            minW={"85vw"}
            minH={"100vh"}
          >
            <Center>
            <Heading fontSize={"3xl"}>Notifications</Heading>
            </Center>

            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Card>
                {/* <Center>
                  <CardHeader>
                    <Heading size='md'>Notifications</Heading>
                  </CardHeader>
                </Center> */}

                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    {notifications?.map((notification) => (
                      <Box key={notification.id}>
                        <Heading size='sm' textTransform='uppercase'>
                          {notification.title}
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          {notification.description}
                        </Text>
                        <Text pt='2' fontSize='xs'>
                          {formatTimestamp(notification.created_at)}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </CardBody>
                
              </Card>

            </Box>
          </Stack>
        </Flex>
      </Layout>
    </>
  );
};

export default GetNotifications;