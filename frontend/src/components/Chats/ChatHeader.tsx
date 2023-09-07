import React from "react";
import { Flex, 
         Avatar, 
         AvatarBadge, 
         Text,
         Image,
         Box 
} from "@chakra-ui/react";

const ChatHeader = () => {
  return (
    <Flex flexDirection="column">
      <Flex w="100%" flexDirection="row">
        {/* <Avatar size="lg" name="Dan Abrahmov" src="https://placekitten.com/600/400">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar> */}

        <Box>
          <Image src="https://www.mobile-dokan.com/wp-content/uploads/2022/07/Realme-GT-Master-Explorer-Edition-500x500.jpg" 
                alt="product-image" 
                boxSize="120px" 
          />
        </Box>
        {/* vertically center */}
        <Flex flexDirection="column" 
              mx="5"
              justifyContent="center"
        >
          <Text fontSize="sm" 
                fontWeight={100}
          >
            Chat with Kamruj Jaman Sheam
          </Text>
          <Text fontSize="2xl" 
                fontWeight="bold"
          >
            Realme GT Master Edition
          </Text>
          <Text fontSize="md"
                fontWeight={400}
          >
            Price: ৳ 35,000
          </Text>
          <Text fontSize="md" 
                fontWeight={400}
          >
            Price is negotiable
          </Text>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatHeader;
