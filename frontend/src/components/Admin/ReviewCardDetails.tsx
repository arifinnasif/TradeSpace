import { Flex, chakra, Badge } from "@chakra-ui/react";
import { Fragment, FunctionComponent } from "react";

interface ReviewCardDetailsProps {
  is_sell_ad: boolean;
  is_used: boolean;
  is_negotiable: boolean;
}

const ReviewCardDetails: FunctionComponent<ReviewCardDetailsProps> = ({
  is_sell_ad,
  is_used,
  is_negotiable,
}) => {
  const is_sell_ad_text = is_sell_ad ? "Sell Ad" : "Buy Ad";
  const is_used_text = is_used ? "Used" : "New";
  const is_negotiable_text = is_negotiable ? "Negotiable" : "Fixed";
  const details = [is_sell_ad_text, is_used_text, is_negotiable_text];
  return (
    <Flex alignItems="center" color="gray.500">
      {details.map((data, index) => (
        <Fragment key={index}>
          {/* <Text fontSize={{ base: "sm", sm: "md" }}>{data}</Text> */}
          <Badge fontSize={"0.8em"} color={"teal.600"}>
            {data}
          </Badge>
          {details.length - 1 != index && (
            <chakra.span mx={2} fontSize={{ base: "sm", sm: "md" }}>
              |
            </chakra.span>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

export default ReviewCardDetails;
