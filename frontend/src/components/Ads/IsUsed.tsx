import { Badge } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface isUsedProps {
  is_used: boolean;
}

const IsUsed: FunctionComponent<isUsedProps> = ({ is_used }) => {
  const ColorScheme = is_used ? "red" : "purple";
  const text = is_used ? "Used" : "New";
  return (
    <Badge colorScheme={ColorScheme} ml={"1"}>
      {text}
    </Badge>
  );
};

export default IsUsed;
