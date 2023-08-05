import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Negotiable from "./Negotiable";
import IsUsed from "./IsUsed";
import { FaThList } from "react-icons/fa";
import BuyOrSellTag from "./BuyOrSellTag";

interface AdCardProps {
  title: string;
  category: string;
  price: string;
  is_used: boolean;
  is_negotiable: boolean;
  is_sell_ad: boolean;
}

const AdCard: FunctionComponent<AdCardProps> = ({
  title,
  category,
  price,
  is_used,
  is_negotiable,
  is_sell_ad,
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
            <HStack>
              <Icon as={FaThList} />
              <Text gap={"10"} py={2}>
                {category}
              </Text>
              <BuyOrSellTag is_sell_ad={is_sell_ad} />
            </HStack>
            {/* Price */}
            <HStack>
              <Text>{price} Tk</Text>
              {is_negotiable && <Negotiable />}
            </HStack>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdCard;
