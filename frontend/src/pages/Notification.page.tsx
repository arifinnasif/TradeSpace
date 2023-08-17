import { useState } from "react";
import Layout from "../layout/Layout";
import {  Box, 
          Card, 
          Center, 
          Flex, 
          Stack,
          useColorModeValue,
          Heading,
} from "@chakra-ui/react";


const notifications = 
  [
    {
      "id": 1,
      "username": "Sheam1805099",
      "type": "promotion",
      "title": "your platinum promotion has expired",
      "description": "the promotion that u purchased has expired",
      "createdAt": "2023-08-17T22:36:57.568Z"
    },
    {
      "id": 2,
      "username": "Sheam1805099",
      "type": "promotion",
      "title": "your platinum promotion has expired",
      "description": "the promotion that u purchased has expired",
      "createdAt": "2023-08-17T22:36:57.568Z"
    },
  ]


const GetNotifications = () => {
  const [isLoading, setIsLoading] = useState(false);
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
            <Heading fontSize={"4xl"}>Notification</Heading>
            </Center>

            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >

            </Box>
          </Stack>
        </Flex>
      </Layout>
    </>
  );
};

export default GetNotifications;