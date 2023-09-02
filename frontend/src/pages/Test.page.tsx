import {
  chakra,
  VStack,
  HStack,
  Text,
  Container,
  Box,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

import { BsFillCloudCheckFill } from "react-icons/bs";
import { AiOutlineCloudServer } from "react-icons/ai";
import { FaServer } from "react-icons/fa";
import Layout from "../layout/Layout";
import { useState } from "react";
import AdCard from "../components/Promotions/AdCard";
import PricingCard from "../components/Promotions/PricingCard";

const plansList = [
  {
    title: "Hobby",
    price: 49,
    icon: BsFillCloudCheckFill,
    features: [
      "Deploy 5 apps",
      "2 Servers",
      "Push to deploy",
      "Collaborate with your team",
    ],
  },
  {
    title: "Growth",
    price: 79,
    icon: AiOutlineCloudServer,
    features: [
      "Deploy 10 apps",
      "4 Servers",
      "Push to deploy",
      "Collaborate with your team",
      "Setup load balanced clusters",
    ],
  },
  {
    title: "Business",
    price: 99,
    icon: FaServer,
    features: [
      "Deploy unlimited apps",
      "unlimited Servers",
      "Push to deploy",
      "Collaborate with your team",
      "Setup load balanced clusters",
    ],
  },
  {
    title: "Business",
    price: 99,
    icon: FaServer,
    features: [
      "Deploy unlimited apps",
      "unlimited Servers",
      "Push to deploy",
      "Collaborate with your team",
      "Setup load balanced clusters",
    ],
  },
];

const ThreeTiersPricing = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout title="Testing" loading={isLoading}>
      {/* <Box bg={"tomato"}> */}

      <Container maxW="7xl" py="8" px="0">
        <chakra.h2 fontSize="5xl" fontWeight="bold" textAlign="center" mb={5}>
          Promote this ad to get more customers
        </chakra.h2>
        <Center>
          <AdCard adId={1} />
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

export default ThreeTiersPricing;

// const TestPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   return (
//     <Layout title="Testing" loading={isLoading}>
//       <Box></Box>
//     </Layout>
//   );
// };

// export default TestPage;
