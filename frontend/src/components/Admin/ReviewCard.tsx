import {
  chakra,
  Stack,
  HStack,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  Button,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

import { FunctionComponent } from "react";
import { FaThList } from "react-icons/fa";
import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";
import ReviewCardDetails from "./ReviewCardDetails";
import { Link } from "react-router-dom";
import { ReviewCardType, approveAReview } from "../../services/admin.service";
import React from "react";
import DeclinationConfirmationModal from "./DeclinationConfirmationModal";

interface ProductCardProps {
  id: number;
  title: string;
  detail: string[];
  location: string;
  updated_at: string;
  price: string;
  image: string;
  isFeatured?: boolean;
}

const productsList: ProductCardProps[] = [
  {
    id: 1,
    title: "Ford F-150 SUV 2021",
    location: "Paris",
    detail: ["2021", "Petrol", "4500 cc", "Automatic"],
    updated_at: "17 days ago",
    price: "$ 400k",
    isFeatured: true,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  },
  {
    id: 2,
    title: "Haval Jolion Top",
    location: "New York",
    detail: ["2021", "Petrol", "3500 cc", "Automatic"],
    updated_at: "1 days ago",
    price: "$ 450k",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  },
];

const ReviewCard: FunctionComponent<ReviewCardType> = ({
  id,
  title,
  category_name,
  price,
  is_used,
  is_negotiable,
  is_sell_ad,
  refreshAction,
}) => {
  const approveButtonAction = async (review_id: number) => {
    console.log("approve button clicked", review_id);
    await approveAReview(review_id);
  };

  const {
    isOpen: isDeclinationOpen,
    onOpen: onDeclinationOpen,
    onClose: onDeclinationClose,
  } = useDisclosure();

  const initialDeclinationRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Container
        ref={finalRef}
        maxW="7xl"
        p={{ base: 5, md: 3 }}
        margin="0 auto"
      >
        <Stack
          key={id}
          spacing={{ base: 0, md: 4 }}
          direction={{ base: "column", md: "row" }}
          border="1px solid"
          borderColor="gray.400"
          p={2}
          rounded="md"
          w={{ base: "auto", md: "3xl" }}
          overflow="hidden"
          pos="relative"
        >
          <Flex ml="0 !important">
            <Image
              rounded="md"
              w={{ base: "100%", md: "18rem" }}
              h="auto"
              objectFit="cover"
              src={productsList[0].image}
              alt="product image"
            />
          </Flex>
          <Stack
            direction="column"
            spacing={2}
            w="100%"
            mt={{ base: "5px !important", sm: 0 }}
          >
            <Link to={`ad_reviews/${id}`}>
              <Flex justify="space-between">
                <chakra.h3
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                >
                  <Text maxWidth={"400px"} noOfLines={1}>
                    {title}
                  </Text>
                </chakra.h3>
                <chakra.h3
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                >
                  {price} BDT
                </chakra.h3>
              </Flex>
            </Link>
            {/* <Box>
            <Text fontSize="lg" fontWeight="500">
              
              BUET
            </Text>
          </Box> */}
            <HStack>
              <Icon as={FaThList} />
              <Text gap={"10"} py={2}>
                {category_name}
              </Text>
            </HStack>
            <HStack>
              <ReviewCardDetails {...{ is_sell_ad, is_used, is_negotiable }} />
              <Spacer />
              <Button
                colorScheme="teal"
                leftIcon={<FaRegCircleCheck />}
                onClick={(e) => {
                  console.log(e);
                  refreshAction();
                  approveButtonAction(+id);
                }}
              >
                Approve
              </Button>
              <Button
                colorScheme="teal"
                leftIcon={<FaRegCircleXmark />}
                onClick={(e) => {
                  console.log(e);
                  onDeclinationOpen();
                  // declineButtonAction(+id);
                }}
              >
                Decline
              </Button>
            </HStack>
          </Stack>
        </Stack>
      </Container>
      <DeclinationConfirmationModal
        id={+id!}
        title={title}
        initialRef={initialDeclinationRef}
        finalRef={finalRef}
        isOpen={isDeclinationOpen}
        onClose={onDeclinationClose}
        refreshAction={refreshAction}
      />
    </>
  );
};

export default ReviewCard;
