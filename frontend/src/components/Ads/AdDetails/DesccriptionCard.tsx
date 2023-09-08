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
import { FunctionComponent } from "react";

interface DesccriptionCardProps {
  description?: string;
}

const DescriptionCard: FunctionComponent<DesccriptionCardProps> = ({
  description,
}) => {
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
      {description && <CardBody>{description}</CardBody>}
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
