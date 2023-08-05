import { FunctionComponent } from "react";
import { Tag } from "@chakra-ui/react";

interface BuyOrSellProps {
  is_sell_ad: boolean;
}

const BuyOrSellTag: FunctionComponent<BuyOrSellProps> = ({ is_sell_ad }) => {
  const ColorScheme = is_sell_ad ? "teal" : "yellow";
  const text = is_sell_ad ? "Sell AD" : "Buy AD";
  return (
    <Tag colorScheme={ColorScheme} ml={"1"} variant={"solid"} size={"lg"}>
      {text}
    </Tag>
  );
};

export default BuyOrSellTag;
