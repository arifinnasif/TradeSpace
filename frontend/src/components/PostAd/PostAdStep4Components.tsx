import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Image,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import { FunctionComponent } from "react";

interface Step4Props {
  onPrev: () => void;
  onSubmit: () => void;
  category?: string;
  title?: string;
  description?: string;
  is_sell_ad: boolean;
  is_negotiable: boolean;
  is_used: boolean;
  years_used?: number;
  months_used?: number;
  days_used?: number;
  price?: number;
  images?: string[];
  is_phone_public: boolean;
  address?: string;
}

const Step4: FunctionComponent<Step4Props> = ({
  onPrev,
  onSubmit,
  category,
  title,
  description,
  is_sell_ad,
  is_negotiable,
  is_used,
  years_used,
  months_used,
  days_used,
  price,
  images,
  is_phone_public,
  address,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">Check your Ad informations</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Category
              </Heading>
              <Text pt="2" fontSize="sm">
                {category}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Title
              </Heading>
              <Text pt="2" fontSize="sm">
                {title}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <Text pt="2" fontSize="sm">
                {description}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Type of Ad
              </Heading>
              <Text pt="2" fontSize="sm">
                {is_sell_ad ? "Sell Ad" : "Buy Ad"}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Price
              </Heading>
              <Text pt="2" fontSize="sm">
                {price}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Is Price Negotiable?
              </Heading>
              <Text pt="2" fontSize="sm">
                {is_negotiable
                  ? "Price is negotiable"
                  : "Price is not negotiable"}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Is Product Used?
              </Heading>
              <Text pt="2" fontSize="sm">
                {is_used ? "Used Product" : "New Product"}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Time of Use
              </Heading>
              <Text pt="2" fontSize="sm">
                {!is_used ? (
                  "N/A for new products"
                ) : (
                  <>
                    {years_used !== undefined && (
                      <span>{years_used} years</span>
                    )}
                    {months_used !== undefined && (
                      <span>
                        {years_used ? ", " : ""}
                        {months_used} months
                      </span>
                    )}
                    {days_used !== undefined && (
                      <span>
                        {years_used || months_used ? ", " : ""}
                        {days_used} days
                      </span>
                    )}
                  </>
                )}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Images
              </Heading>
              <Text pt="2" fontSize="sm">
                {images && images.length > 0
                  ? images.map((url, index) => <Image key={index} src={url} />)
                  : "No images provided"}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Is Phone Number Public?
              </Heading>
              <Text pt="2" fontSize="sm">
                {is_phone_public
                  ? "Phone number is public"
                  : "Phone number is private"}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Address
              </Heading>
              <Text pt="2" fontSize="sm">
                {address}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <Flex justifyContent={"space-between"}>
        <Button
          onClick={onPrev}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Previous
        </Button>
        <Button
          // isDisabled={isCurrentInputInValid()}
          onClick={onSubmit}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default Step4;
