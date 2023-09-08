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
} from "@chakra-ui/react";

import { FaBaby } from "react-icons/fa";

const InfoCard = () => {
  return (
    <Card
      variant={"elevated"}
      shadow={"xl"}
      bg={useColorModeValue("teal.50", "teal.900")}
      height={"xs"}
    >
      <CardBody textAlign={"center"}>
        <AbsoluteCenter>
          <Icon as={FaBaby} w={10} h={10} alignSelf={"center"} />

          <Heading size="xl">Buy</Heading>
        </AbsoluteCenter>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
