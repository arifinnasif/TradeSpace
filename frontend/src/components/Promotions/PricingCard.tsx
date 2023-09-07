import { BiCheck } from "react-icons/bi";
import { IconType } from "react-icons";
import {
  chakra,
  Box,
  Icon,
  useColorModeValue,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import _, { set } from "lodash";
import { promoteAd } from "../../services/promotion.service";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  adId: number;
  promotion_name: string;
  price: number;
  features: string[];
  isPromotionRequestProcessing: boolean;
  setIsPromotionRequestProcessing: (value: boolean) => void;

  icon: IconType;
}

const PricingCard = ({
  adId,
  promotion_name,
  price,
  icon,
  isPromotionRequestProcessing,
  setIsPromotionRequestProcessing,
  features,
}: PricingCardProps) => {
  const buyButtonAction = async () => {
    try {
      setIsPromotionRequestProcessing(true);
      console.log("buy button clicked");
      const { payment_gateway_url } = await promoteAd(adId, promotion_name);
      setIsPromotionRequestProcessing(false);
      window.location.replace(payment_gateway_url);
    } catch (error) {
      // navigate(payment_gateway_url);
      console.log(error);
    }
  };
  return (
    <Box
      minW={{ base: "xs", sm: "xs", lg: "sm" }}
      rounded="md"
      bg={useColorModeValue("teal.50", "teal.900")}
      boxShadow="xl"
      marginInline="auto"
      my={3}
      p={6}
    >
      <Box textAlign="center">
        <Icon as={icon} h={10} w={10} color="teal.500" />
        <chakra.h2 fontSize="2xl" fontWeight="bold">
          {_.startCase(promotion_name)}
        </chakra.h2>
        <Text fontSize="7xl" fontWeight="bold">
          <Text as="sup" fontSize="3xl" fontWeight="normal" top="-1em">
            ৳
          </Text>
          {price}
        </Text>
        {/* <Text fontSize="md" color="gray.500">
          per month
        </Text> */}
      </Box>
      <VStack spacing={2} alignItems="flex-start" my={6}>
        {features.map((feature, index) => (
          <HStack key={index} spacing={3}>
            <Icon as={BiCheck} h={4} w={4} color="green.500" />
            <Text fontSize="sm" color="gray.500">
              {feature}
            </Text>
          </HStack>
        ))}
      </VStack>
      <Button
        isDisabled={isPromotionRequestProcessing}
        colorScheme="teal"
        variant="solid"
        size="md"
        rounded="md"
        w="100%"
        onClick={buyButtonAction}
      >
        Buy
      </Button>
    </Box>
  );
};

export default PricingCard;
