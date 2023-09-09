import React from "react";
import { Flex, Avatar, AvatarBadge, Text, Image, Box } from "@chakra-ui/react";

const ChatHeader = ({
  ad_title,
  ad_image,
  op_username,
  op_fullname,
  price,
}: {
  ad_title: string;
  ad_image: string;
  op_username: string;
  op_fullname: string;
  price: number;
}) => {
  return (
    <Flex flexDirection="column">
      <Flex w="100%" flexDirection="row">
        {/* <Avatar size="lg" name="Dan Abrahmov" src="https://placekitten.com/600/400">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar> */}

        <Box>
          <Image src={ad_image} alt="product-image" boxSize="120px" />
        </Box>
        {/* vertically center */}
        <Flex flexDirection="column" mx="5" justifyContent="center">
          <Text fontSize="sm" fontWeight={100}>
            Chat with @{op_username} ({op_fullname})
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {ad_title}
          </Text>
          <Text fontSize="md" fontWeight={400}>
            Price: ৳ {price}
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
