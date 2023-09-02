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
  adId: number;
}

const AdCard: FunctionComponent<AdCardProps> = ({ adId }) => {
  return (
    <Card
      width={{ base: "100%" }}
      height="sm"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant={"elevated"}
      shadow={"xl"}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "400px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Flex w={"3xl"} justify="space-between">
            <Heading size="xl">The perfect latte {adId}</Heading>
            <Heading size="xl">BDT 500</Heading>
          </Flex>
          <Divider />

          <Text
            textColor={useColorModeValue("gray.600", "gray.300")}
            py="12"
            noOfLines={3}
            maxWidth={"xl"}
            fontSize="lg"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            itaque voluptatum aliquam recusandae dolorum molestiae voluptas
            nostrum expedita eaque quam excepturi ullam amet, debitis voluptate
            necessitatibus, autem at, deserunt reiciendis? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Asperiores itaque voluptatum
            aliquam recusandae dolorum molestiae voluptas nostrum expedita eaque
            quam excepturi ullam amet, debitis voluptate necessitatibus, autem
            at, deserunt reiciendis? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Asperiores itaque voluptatum aliquam recusandae
            dolorum molestiae voluptas nostrum expedita eaque quam excepturi
            ullam amet, debitis voluptate necessitatibus, autem at, deserunt
            reiciendis? Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Asperiores itaque voluptatum aliquam recusandae dolorum
            molestiae voluptas nostrum expedita eaque quam excepturi ullam amet,
            debitis voluptate necessitatibus, autem at, deserunt reiciendis?
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default AdCard;
