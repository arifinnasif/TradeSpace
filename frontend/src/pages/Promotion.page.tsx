import { chakra, Container, SimpleGrid, Center } from "@chakra-ui/react";

import { FaBicycle, FaCarSide, FaRocket } from "react-icons/fa";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import AdCard from "../components/Promotions/AdCard";
import PricingCard from "../components/Promotions/PricingCard";
import { useParams } from "react-router-dom";
import { getPromotions, PromotionType } from "../services/promotion.service";
import { Icon } from "leaflet";
import { IconType } from "react-icons";

const plansList = [
  {
    title: "Silver",
    price: 49,
    icon: FaBicycle,
    features: [
      "Deploy 5 apps",
      "2 Servers",
      "Push to deploy",
      "Collaborate with your team",
    ],
  },
  {
    title: "Gold",
    price: 79,
    icon: FaCarSide,
    features: [
      "Deploy 10 apps",
      "4 Servers",
      "Push to deploy",
      "Collaborate with your team",
      "Setup load balanced clusters",
    ],
  },
  {
    title: "Platinum",
    price: 99,
    icon: FaRocket,
    features: [
      "Deploy unlimited apps",
      "unlimited Servers",
      "Push to deploy",
      "Collaborate with your team",
      "Setup load balanced clusters",
    ],
  },
];

interface UsablePromotionType {
  title: string;
  price: number;
  icon: IconType;
  features: string[];
}

const PromotionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [promotions, setPromotions] = useState<UsablePromotionType[]>([]);
  const { id } = useParams();

  const fetchPromotions = async () => {
    setIsLoading(true);
    const promotion_list: PromotionType[] = await getPromotions();
    const usable_promotion_list = promotion_list.map((p) => ({
      title: p.promotion_type,
      price: p.cost,
      icon: FaBicycle,
      features: [
        `Get upto ${p.ticket} times more views`,
        // split p.description by \n and add each line as a feature
        ...p.description.split("\n"),
        `Valid for ${p.validity_days} days`,
      ],
    }));
    usable_promotion_list[usable_promotion_list.length - 1].icon = FaRocket;
    usable_promotion_list[usable_promotion_list.length - 2].icon = FaCarSide;
    setPromotions(usable_promotion_list);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPromotions();
  });

  return (
    <Layout title="Testing" loading={isLoading}>
      {/* <Box bg={"tomato"}> */}

      <Container maxW="7xl" py="8" px="0">
        <chakra.h2 fontSize="5xl" fontWeight="bold" textAlign="center" mb={5}>
          Promote this ad to get more customers
        </chakra.h2>
        <Center>
          <AdCard adId={+id!} />
        </Center>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={1} mt={16}>
          {promotions.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </SimpleGrid>
      </Container>
      {/* </Box> */}
    </Layout>
  );
};

export default PromotionPage;
