import React from "react";
import { Flex, Avatar, AvatarBadge, Text, Image, Box } from "@chakra-ui/react";

const ChatHeader = ({
  adTitle,
  adImage,
  receiverUsername,
  receiverFullname,
  adPrice,
}: {
  adTitle: string;
  adImage: string;
  receiverUsername: string;
  receiverFullname: string;
  adPrice: number;
}) => {
  return (
    <Flex flexDirection="column">
      <Flex w="100%" flexDirection="row">
        {/* <Avatar size="lg" name="Dan Abrahmov" src="https://placekitten.com/600/400">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar> */}

        <Box>
          <Image src={adImage} alt="product-image" boxSize="120px" />
        </Box>
        {/* vertically center */}
        <Flex flexDirection="column" mx="5" justifyContent="center">
          <Text fontSize="sm" fontWeight={100}>
            Chat with @{receiverUsername} ({receiverFullname})
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {adTitle}
          </Text>
          <Text fontSize="md" fontWeight={400}>
            Price: ৳ {adPrice}
          </Text>
          {/* <Text fontSize="md" 
                fontWeight={400}
          >
            Price is negotiable
          </Text> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatHeader;
