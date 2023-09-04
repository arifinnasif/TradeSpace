import { chakra, Container, SimpleGrid, Center } from "@chakra-ui/react";

import { FaBicycle, FaCarSide, FaRocket } from "react-icons/fa";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import AdCard from "../components/Promotions/AdCard";
import PricingCard from "../components/Promotions/PricingCard";
import { useParams } from "react-router-dom";
import { getPromotions, PromotionType } from "../services/promotion.service";
import _ from "lodash";
import { IconType } from "react-icons";
import Spinner from "../components/Spinner";
import { adService } from "../services/ad.service";

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
  const [isPromotionListLoading, setIsPromotionListLoading] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [promotions, setPromotions] = useState<UsablePromotionType[]>([]);
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [adPrice, setAdPrice] = useState(0);
  const [adImage, setAdImage] = useState("");
  const { id } = useParams();

  const fetAd = async (id: number) => {
    setIsAdLoading(true);
    const { title, description, price, image1 } = await adService.getAdDetails(
      id
    );
    setAdTitle(title);
    setAdDescription(description!);
    setAdPrice(price!);
    setAdImage(image1);
    setIsAdLoading(false);
  };

  const fetchPromotions = async () => {
    setIsPromotionListLoading(true);
    const promotion_list: PromotionType[] = await getPromotions();
    const usable_promotion_list = promotion_list.map((p) => ({
      title: _.startCase(p.promotion_type),
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
    setIsPromotionListLoading(false);
  };

  useEffect(() => {
    fetAd(Number(id));
    fetchPromotions();
  }, []);

  return (
    <Layout title="Testing" loading={false}>
      {/* <Box bg={"tomato"}> */}

      <Container maxW="7xl" py="8" px="0">
        <chakra.h2 fontSize="5xl" fontWeight="bold" textAlign="center" mb={5}>
          Promote this ad to get more customers
        </chakra.h2>
        <Center>
          {isAdLoading ? (
            <Center>
              <Spinner size="100px" />
            </Center>
          ) : (
            <AdCard
              title={adTitle}
              description={adDescription}
              price={adPrice}
              image={adImage}
            />
          )}
        </Center>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={1} mt={16}>
          {isPromotionListLoading ? (
            <>
              <Center>
                <Spinner size="100px" />
              </Center>
              <Center>
                <Spinner size="100px" />
              </Center>
              <Center>
                <Spinner size="100px" />
              </Center>
            </>
          ) : (
            promotions.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))
          )}
        </SimpleGrid>
      </Container>
      {/* </Box> */}
    </Layout>
  );
};

export default PromotionPage;
