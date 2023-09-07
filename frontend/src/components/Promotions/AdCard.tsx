import {
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface AdCardProps {
  title: string;
  price: number;
  description: string;
  image: string;
}

const AdCard: FunctionComponent<AdCardProps> = ({
  title,
  price,
  description,
  image,
}) => {
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
        maxW={{ base: "100%", sm: "400px" }}
        src={image}
        alt={title}
      />

      <Stack>
        <CardBody>
          <Flex w={"3xl"} justify="space-between">
            <Heading size="xl">{title}</Heading>
            <Heading size="xl">BDT {price}</Heading>
          </Flex>
          <Divider />

          <Text
            textColor={useColorModeValue("gray.600", "gray.300")}
            py="12"
            noOfLines={3}
            maxWidth={"xl"}
            fontSize="lg"
          >
            {description}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default AdCard;
