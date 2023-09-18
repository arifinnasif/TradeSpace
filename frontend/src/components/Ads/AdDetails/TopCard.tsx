import { FunctionComponent } from "react";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  useColorModeValue,
  Flex,
  Divider,
  HStack,
  Icon,
  Text,
  Box,
  StackDivider,
} from "@chakra-ui/react";

import { FaUser, FaCalendarDay } from "react-icons/fa";

interface TopCardProps {
  title: string;
  price?: number;
  op_username: string;
  op_fullname: string;
  created_at: string;
  op_email: string;
  op_phone?: string;
  image?: string;
  address: string;
}

const TopCard: FunctionComponent<TopCardProps> = ({
  title,
  price,
  op_username,
  op_fullname,
  created_at,
  op_email,
  op_phone,
  image,
  address,
}) => {
  return (
    <Card
      width={{ base: "100%" }}
      height="lg"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant={"elevated"}
      shadow={"xl"}
      mt={6}
      bg={useColorModeValue("teal.50", "teal.900")}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "450px" }}
        src={
          image
            ? image
            : "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        }
        alt={title}
      />

      <Stack>
        <CardBody>
          <Flex w={"3xl"} justify="space-between">
            <Heading size="xl">{title}</Heading>
            {price && <Heading size="xl">BDT {price}</Heading>}
          </Flex>
          <Divider />

          <Stack divider={<StackDivider />} marginTop={8} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Posted By
              </Heading>
              <Text pt="2" fontSize="sm">
                @{op_username} ({op_fullname})
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Posted On
              </Heading>
              <Text pt="2" fontSize="sm">
                {created_at}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Email
              </Heading>
              <Text pt="2" fontSize="sm">
                {op_email}
              </Text>
            </Box>
            {op_phone && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Phone
                </Heading>
                <Text pt="2" fontSize="sm">
                  +8801234567890
                </Text>
              </Box>
            )}
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

        {/* <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
        </CardFooter> */}
      </Stack>
    </Card>
  );
};

export default TopCard;
