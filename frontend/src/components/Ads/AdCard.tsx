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

import { AdCardType } from "../../services/ad.service";

const AdCard: FunctionComponent<AdCardType> = ({
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
        width={"700px"}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://placehold.co/600x400"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md" paddingBottom={"2"}>
              {title} <IsUsed is_used={is_used} />
            </Heading>

            <BuyOrSellTag is_sell_ad={is_sell_ad} />

            {/* Category */}
            <HStack>
              <Icon as={FaThList} />
              <Text gap={"10"} py={2}>
                {category}
              </Text>
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
