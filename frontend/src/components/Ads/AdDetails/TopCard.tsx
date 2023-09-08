import { FunctionComponent } from "react";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  CardFooter,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

interface TopCardProps {
  title: string;
  op_username: string;
  op_fullname: string;
  op_email: string;
  op_phone: string;
  op_location: string;
}

const TopCard = () => {
  return (
    <Card
      width={{ base: "100%" }}
      height="sm"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant={"elevated"}
      shadow={"xl"}
      bg={useColorModeValue("teal.50", "teal.900")}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default TopCard;
