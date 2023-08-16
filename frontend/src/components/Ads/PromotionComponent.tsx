import { Text, Flex, Icon } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Promotion_type {
  promotion_type: string;
}

const promotion: FunctionComponent<Promotion_type> = ({ promotion_type }) => {
  const isPromoted =
    promotion_type === "Platinum" ||
    promotion_type === "Gold" ||
    promotion_type === "Silver";

  return (
    <>
      {isPromoted && (
        <Flex
          alignItems="center"
          p={1}
          bg="red.400"
          pos="absolute"
          fontSize="xs"
          fontWeight="500"
          color="white"
          top={0}
          left={0}
        >
          <Text>Featured</Text> &nbsp;{" "}
          <Icon as={AiOutlineExclamationCircle} h={4} w={4} />
        </Flex>
      )}
    </>
  );
};

export default promotion;
