import { PropsWithChildren, Fragment } from "react";
import {
  chakra,
  Box,
  Stack,
  VStack,
  HStack,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  StackProps,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { AiOutlineHeart, AiOutlineExclamationCircle } from "react-icons/ai";
import { BsTelephoneX } from "react-icons/bs";

import { FunctionComponent } from "react";
import { declinedAdsType } from "../../../services/User.service";
import Promotion from "./PromotionComponent";
import { FaThList } from "react-icons/fa";
import AdCardDetail from "../../Ads/AdCardDetail";

const DeclinedAdCard: FunctionComponent<declinedAdsType> = ({
  id,
  title,
  price,
  image1,
  op_username,
  description,
  reason,
  address,
  created_at,
}) => {
  return (
    <Container maxW={"7xl"} p={{ base: 5, md: 3 }} margin="0 auto">
      <Stack
        key={id}
        spacing={{ base: 0, md: 4 }}
        direction={{ base: "column", md: "row" }}
        border="1px solid"
        borderColor="gray.400"
        p={2}
        rounded="md"
        w={{ base: "auto", md: "2xl" }}
        overflow="hidden"
        pos="relative"
      >
        {/* <Promotion promotion_type={promotion_type} /> */}
        <Flex ml="0 !important">
          <Image
            rounded="md"
            w={{ base: "100%", md: "18rem" }}
            h="auto"
            boxSize="150px"
            objectFit="cover"
            src={image1}
            alt="product image"
          />
        </Flex>
        <Stack
          direction="column"
          spacing={2}
          w="100%"
          mt={{ base: "5px !important", sm: 0 }}
        >
          <Flex justify="space-between">
            <chakra.h3
              color={"teal"}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
            >
              {title}
            </chakra.h3>
            <chakra.h3
              color={"teal"}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
            >
              {price} BDT
            </chakra.h3>
          </Flex>
          {/* <Box>
            <Text fontSize="lg" fontWeight="500">
              
              BUET
            </Text>
          </Box> */}
          {/* <HStack>
            <Icon color={"teal"} as={FaThList} />
            <Text gap={"10"} py={2} color="teal">
              {category_name}
            </Text>
          </HStack> */}
          {/* <AdCardDetail {...{ is_sell_ad, is_used, is_negotiable }} /> */}

          {/* <Box>
            <Text fontSize="lg" fontWeight="500" color={"teal"}>
              {description}
            </Text>
          </Box> */}

          <Box>
            <Text fontSize="lg" fontWeight="500" color={"teal"}>
              Address: {address}
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="500" color={"red.300"}>
              {reason}
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

const IconButton = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <HStack
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      px={2}
      py="0.15rem"
      alignItems="center"
      rounded="sm"
      spacing={2}
      {...props}
    >
      {children}
    </HStack>
  );
};

export default DeclinedAdCard;
