import { Text, Flex, Icon } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FaAward, FaMedal, FaRibbon } from "react-icons/fa";

interface Promotion_type {
  promotion_type: string;
}

const promotion: FunctionComponent<Promotion_type> = ({ promotion_type }) => {
  const isPromoted =
    promotion_type === "Platinum" ||
    promotion_type === "Gold" ||
    promotion_type === "Silver";

  const promotionbg = {
    Platinum: "red.400",
    Gold: "yellow.400",
    Silver: "gray.500",
  };

  return (
    <>
      {isPromoted && (
        <Flex
          alignItems="center"
          p={1}
          bg={promotionbg[promotion_type]}
          pos="absolute"
          fontSize="1em"
          fontWeight="500"
          color="white"
          top={0}
          left={0}
        >
          <Text>{promotion_type}</Text> &nbsp; <Icon as={FaMedal} h={4} w={4} />
        </Flex>
      )}
    </>
  );
};

export default promotion;
