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
import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { AdCardType } from "../../../services/ad.service";
import AdCardDetail from "../../Ads/AdCardDetail";

const MyAdCard: FunctionComponent<AdCardType> = ({
  id,
  title,
  category_name,
  price,
  is_used,
  is_negotiable,
  is_sell_ad,
  promotion_type,
  image1,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxW="7xl" p={{ base: 5, md: 3 }} margin="0 auto">
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
            {/* <Link to={`/admin/ad_reviews/${id}`}> */}
            <Image
              rounded="md"
              w={{ base: "100%", md: "18rem" }}
              h="auto"
              boxSize="150px"
              objectFit="cover"
              src={image1}
              alt="product image"
            />
            {/* </Link> */}
          </Flex>
          <Stack
            direction="column"
            spacing={2}
            w="100%"
            mt={{ base: "5px !important", sm: 0 }}
          >
            <Link to={`/ads/${id}`}>
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
              <AdCardDetail
                {...{
                  is_sell_ad,
                  is_used,
                  is_negotiable,
                }}
              />
              <Spacer />
              {promotion_type === "normal" && is_sell_ad && (
                <Button
                  colorScheme="teal"
                  onClick={() => navigate(`/ads/${id}/promote`)}
                >
                  Promote
                </Button>
              )}
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default MyAdCard;
