import { Card, 
         Stack, 
         CardBody, 
         Heading, 
         CardFooter, 
         Button,
         Image,
         Text,
         Flex} from "@chakra-ui/react";

import { Link } from "react-router-dom";


import { InboxType } from "../../services/Chat.service";


const UserCard = ({ inboxItem } :{inboxItem: InboxType}) => {

    const handleOpenChat = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log("Open chat");
        const cardId = event.currentTarget.id;
        console.log('Clicked card with id:', cardId);
    }


    return(
        <Card
            as={Link}
            id="2"
            direction="row"
            overflow='hidden'
            variant='outline'
            width="100%"
            height="100px"
            // print the id of the card when clicked
            onClick={(event) => {
                handleOpenChat(event);
            }}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '20%'}}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
            />
            {/* space between flex items should be justified */}
            <Flex flexDirection="column" justifyContent="space-between" width="fit-content"> 
                <CardBody padding={2}>
                <Text fontSize='xl'
                      fontWeight='bold'
                >
                    Kamruj Jaman Sheam
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                    Realme GT Master Edition
                </Text>
                <Flex flexDirection="row" justifyContent="space-between">
                    
                    <Text fontSize='md'>
                        A certain message
                    </Text>
                    <Text fontSize='md' textColor={'gray.500'}>
                        - 2:30 PM
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
    )
}

export default UserCard;