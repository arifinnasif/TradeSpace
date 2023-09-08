import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Center,
  AbsoluteCenter,
  Divider,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";

import { FaMapMarkerAlt } from "react-icons/fa";

const DescriptionCard = () => {
  return (
    <Card
      width={{ base: "100%" }}
      height="md"
      //   direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant={"elevated"}
      shadow={"xl"}
      mt={6}
      bg={useColorModeValue("teal.50", "teal.900")}
    >
      <CardHeader>
        <Heading size="xl">Description</Heading>
        <Divider />
      </CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio fugiat
        deleniti repudiandae perspiciatis, ipsam quibusdam, quaerat tempora
        consequuntur velit vel, dolor modi ipsum pariatur aut! Vitae animi modi
        praesentium optio?
      </CardBody>
      <CardFooter>
        <Button leftIcon={<ChatIcon />} margin={2} colorScheme="teal">
          Chat
        </Button>

        <Button leftIcon={<FaMapMarkerAlt />} margin={2} colorScheme="teal">
          Map
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DescriptionCard;
