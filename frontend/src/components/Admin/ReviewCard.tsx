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
  Spinner,
  useToast,
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
  const toast = useToast();
  const approveButtonAction = async (review_id: number) => {
    setIsApproveButtonLoading(true);
    console.log("approve button clicked", review_id);
    try {
      await approveAReview(review_id);
      toast({
        title: "Ad approved successfully",
        status: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log(error);
      toast({
        title: "Cannot approve this ad",
        description: error.message,
        status: "error",
      });
    }
    setIsApproveButtonLoading(false);
  };

  const {
    isOpen: isDeclinationOpen,
    onOpen: onDeclinationOpen,
    onClose: onDeclinationClose,
  } = useDisclosure();

  const initialDeclinationRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isApproveButtonLoading, setIsApproveButtonLoading] =
    React.useState(false);
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
          w={{
            base: "auto",
            md: "3xspinner={<BeatLoader size={8} color='white' />}l",
          }}
          overflow="hidden"
          pos="relative"
        >
          <Flex ml="0 !important">
            <Image
              rounded="md"
              w={{ base: "100%", md: "18rem" }}
              h="auto"
              objectFit="cover"
              src={
                "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
              }
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
                isLoading={isApproveButtonLoading}
                colorScheme="teal"
                leftIcon={<FaRegCircleCheck />}
                spinner={<Spinner size={"md"} color="white" />}
                onClick={async () => {
                  await approveButtonAction(+id);
                  refreshAction();
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
