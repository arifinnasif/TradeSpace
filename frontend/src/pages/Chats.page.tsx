import { Flex, Grid, GridItem } from "@chakra-ui/react";



const GetChats = () => {
    return(
        <Grid height={"100vh"}
              templateColumns="repeat(5, 1fr)" 
              gap={4}
        >
            <GridItem colSpan={2}>
                <Flex w="100%" h="100vh" justify="center" align="center">
                    <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
                        <div>
                            <h1>Sidebar</h1>
                        </div>
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem colSpan={3}>
                <Flex w="100%" h="100vh" justify="center" align="center">
                    <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
                        <div>
                            <h1>Chats</h1>
                        </div>
                    </Flex>
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default GetChats;