import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface AdCardProps {
  title: string;
  category: string;
  price: string;
}

const AdCard: FunctionComponent<AdCardProps> = ({ title, category, price }) => {
  return (
    <Box height={"40"} width={"xl"} justifyItems={"end"} alignContent={"end"}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        colorScheme="teal"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://placehold.co/600x400"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{title}(Used)</Heading>
            {/* Category */}
            <Text py={2}>{category}</Text>
            {/* Price */}
            <Text>{price} Tk (Negotiable)</Text>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdCard;
