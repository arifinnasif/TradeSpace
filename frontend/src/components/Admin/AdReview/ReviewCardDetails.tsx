import {
  Flex,
  chakra,
  Badge,
  Text,
  HStack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Fragment, FunctionComponent } from "react";
import { FaRobot } from "react-icons/fa";
import AIModal from "./AIModal";

interface ReviewCardDetailsProps {
  is_sell_ad: boolean;
  is_used: boolean;
  is_negotiable: boolean;
  ai_verdict: any;
}

const ReviewCardDetails: FunctionComponent<ReviewCardDetailsProps> = ({
  is_sell_ad,
  is_used,
  is_negotiable,
  ai_verdict,
}) => {
  const aiButtonAction = () => {
    console.log("ai button clicked");
    onAIModalOpen();
  };

  const is_sell_ad_text = is_sell_ad ? "Sell Ad" : "Buy Ad";
  const is_used_text = is_used ? "Used" : "New";
  const is_negotiable_text = is_negotiable ? "Negotiable" : "Fixed";

  const {
    isOpen: isAIModalOpen,
    onOpen: onAIModalOpen,
    onClose: onAIModalClose,
  } = useDisclosure();

  const initialAIModalRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const details = [is_sell_ad_text, is_used_text, is_negotiable_text];
  return (
    <>
      <Flex alignItems="center" color="gray.500" ref={finalRef}>
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
        <chakra.span mx={2} fontSize={{ base: "sm", sm: "md" }}>
          |
        </chakra.span>
        <Fragment>
          {/* <Text fontSize={{ base: "sm", sm: "md" }}>{data}</Text> */}
          {ai_verdict.weighted_threat_score < 0.5 ? (
            <Tooltip
              label={`TradeSpaceAI thinks that the threat score is ${ai_verdict.weighted_threat_score.toFixed(
                2
              )}`}
            >
              <Badge
                fontSize={"0.8em"}
                color={"green"}
                onClick={aiButtonAction}
              >
                <HStack>
                  <FaRobot />
                  <Text>approvable</Text>
                </HStack>
              </Badge>
            </Tooltip>
          ) : (
            <Tooltip
              label={`TradeSpaceAI thinks that the threat score is ${ai_verdict.weighted_threat_score.toFixed(
                2
              )}`}
            >
              <Badge
                fontSize={"0.8em"}
                color={"red"}
                onClick={() => aiButtonAction()}
              >
                <HStack>
                  <FaRobot />
                  <Text>declinable</Text>
                </HStack>
              </Badge>
            </Tooltip>
          )}
        </Fragment>
      </Flex>
      <AIModal
        isOpen={isAIModalOpen}
        onClose={onAIModalClose}
        initialRef={initialAIModalRef}
        finalRef={finalRef}
      />
    </>
  );
};

export default ReviewCardDetails;
