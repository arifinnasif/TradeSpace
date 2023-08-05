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
import Negotiable from "./Negotiable";
import IsUsed from "./IsUsed";

interface AdCardProps {
  title: string;
  category: string;
  price: string;
  is_used: boolean;
  is_negotiable: boolean;
}

const AdCard: FunctionComponent<AdCardProps> = ({
  title,
  category,
  price,
  is_used,
  is_negotiable,
}) => {
  return (
    <Box height={"40"} width={"700px"} p={"1"}>
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
            <Heading size="md">
              {title} <IsUsed is_used={is_used} />
            </Heading>
            {/* Category */}
            <Text py={2}>{category}</Text>
            {/* Price */}
            <Text>
              {price} Tk {is_negotiable && <Negotiable />}
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdCard;
