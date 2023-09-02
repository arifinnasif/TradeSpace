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
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiCheck } from "react-icons/bi";
import { BsFillCloudCheckFill } from "react-icons/bs";
import { AiOutlineCloudServer } from "react-icons/ai";
import { FaServer } from "react-icons/fa";
import { IconType } from "react-icons";
import Layout from "../layout/Layout";
import { useState } from "react";
import { FaThList } from "react-icons/fa";
import AdCard from "../components/Ads/AdCard";

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
          Simple and affordable pricing
        </chakra.h2>
        <Center id="nice">
          <Card
            width={{ base: "100%" }}
            height="sm"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant={"elevated"}
            shadow={"xl"}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "400px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Flex w={"3xl"} justify="space-between">
                  <Heading size="xl">The perfect latte</Heading>
                  <Heading size="xl">BDT 500</Heading>
                </Flex>
                <Divider />

                <Text
                  textColor={useColorModeValue("gray.600", "gray.300")}
                  py="12"
                  noOfLines={3}
                  maxWidth={"xl"}
                  fontSize="lg"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores itaque voluptatum aliquam recusandae dolorum
                  molestiae voluptas nostrum expedita eaque quam excepturi ullam
                  amet, debitis voluptate necessitatibus, autem at, deserunt
                  reiciendis? Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Asperiores itaque voluptatum aliquam
                  recusandae dolorum molestiae voluptas nostrum expedita eaque
                  quam excepturi ullam amet, debitis voluptate necessitatibus,
                  autem at, deserunt reiciendis? Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Asperiores itaque voluptatum
                  aliquam recusandae dolorum molestiae voluptas nostrum expedita
                  eaque quam excepturi ullam amet, debitis voluptate
                  necessitatibus, autem at, deserunt reiciendis? Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit. Asperiores
                  itaque voluptatum aliquam recusandae dolorum molestiae
                  voluptas nostrum expedita eaque quam excepturi ullam amet,
                  debitis voluptate necessitatibus, autem at, deserunt
                  reiciendis?
                </Text>
              </CardBody>
            </Stack>
          </Card>
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

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  icon: IconType;
}

const PricingCard = ({ title, price, icon, features }: PricingCardProps) => {
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
          {title}
        </chakra.h2>
        <Text fontSize="7xl" fontWeight="bold">
          <Text as="sup" fontSize="3xl" fontWeight="normal" top="-1em">
            ৳
          </Text>
          {price}
        </Text>
        <Text fontSize="md" color="gray.500">
          per month
        </Text>
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
        colorScheme="teal"
        variant="solid"
        size="md"
        rounded="md"
        w="100%"
      >
        Get Started
      </Button>
    </Box>
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
