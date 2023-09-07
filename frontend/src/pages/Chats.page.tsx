import { Flex, Grid, GridItem } from "@chakra-ui/react";
import ChatHeader from "../components/Chats/ChatHeader";
import Divider from "../components/Chats/Divider";



const GetChats = () => {
    return(
        <Grid height={"100vh"}
              templateColumns="repeat(5, 1fr)" 
              gap={4}
        >
            <GridItem colSpan={2} 
                      bg="tomato" 
                      height="100vh"
            >
                <Flex w="100%" 
                      h="100vh" 
                      justify="center" 
                      align="center"
                >
                    <Flex w={["100%", "100%", "40%"]}
                          h="90%" 
                          flexDir="column"
                    >
                        <div>
                            <h1>Sidebar</h1>
                        </div>
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem colSpan={3} 
                      height="100vh"
            >
                <Flex w="100%" 
                      h="100vh" 
                      align = "left"
                >
                    <Flex h="90%" 
                          flexDir="column" 
                          w="90%" 
                          padding="1rem"
                    >
                    <ChatHeader />

                    <Divider />

                        {/* <div>
                            <h1>Chats</h1>
                        </div> */}
                    </Flex>
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default GetChats;