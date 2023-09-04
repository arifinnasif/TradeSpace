import { chakra, Container, SimpleGrid, Center } from "@chakra-ui/react";

import { FaBicycle, FaCarSide, FaRocket } from "react-icons/fa";
import Layout from "../layout/Layout";
import { useState } from "react";
import AdCard from "../components/Promotions/AdCard";
import PricingCard from "../components/Promotions/PricingCard";
import { useParams } from "react-router-dom";

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

const PromotionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
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
          {plansList.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </SimpleGrid>
      </Container>
      {/* </Box> */}
    </Layout>
  );
};

export default PromotionPage;
