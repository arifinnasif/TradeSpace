import { ChatIcon } from "@chakra-ui/icons";
import {
  Grid,
  Image,
  GridItem,
  Text,
  Icon,
  HStack,
  Badge,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaThList,
  FaClock,
  FaDollarSign,
  FaCalendarDay,
  FaMapMarkerAlt,
  FaMedal,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { adService, AdDetailsType } from "../../services/ad.service";

// interface AdDetailsProps {
//   ad_id: number
// op_username: string,
// op_fullname: string,
// category_name: string,
// title: string,
// description?: string,
// price?: string,
// is_used: boolean,
// days_used?: number,
// phone?: string,
// promotion_type?: string,
// createdAt: string,
// }

const AdDetils = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ad, setAd] = useState<AdDetailsType>();
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ad_details = await adService.getAdDetails(+id!);
      setAd(ad_details);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  return (
    // <Box>

    // </Box>

    <Grid
      templateAreas={`"adtype_section adtype_section"
                            "header_section header_section"
                            "image_section feature_section"
                            "details_section details_section"
                            "button_section button_section"`}
      gridTemplateRows={"50px 50px 400px 1fr 1fr"}
      gridTemplateColumns={"400px 1fr"}
      // h='200px'
      // w='100%'
      gap="3"
      // color="blackAlpha.700"
      // fontWeight="bold"
      mx="70px"
    >
      <GridItem
        py="2"
        textAlign="center"
        // bg="orange.300"
        area={"adtype_section"}
      >
        <Text fontWeight="bold" fontSize="2xl">
          {ad?.is_sell_ad ? "Sell" : "Buy"} Ad
        </Text>
        <Divider />
      </GridItem>
      <GridItem pl="2" fontWeight="bold" area={"header_section"}>
        <HStack>
          <Text fontSize="4xl">{ad?.title}</Text>
          {ad?.promotion_type !== "normal" ? (
            <>
              <Tag
                size="lg"
                key="lg"
                variant="solid"
                fontWeight="bold"
                colorScheme="yellow"
              >
                <TagLeftIcon as={FaMedal} />
                <TagLabel>{ad?.promotion_type}</TagLabel>
              </Tag>
            </>
          ) : null}
        </HStack>
      </GridItem>
      <GridItem pl="2" area={"image_section"}>
        <Image
          boxSize="400px"
          objectFit="cover"
          src="https://placehold.co/600x400"
        />
      </GridItem>
      <GridItem p="5" fontWeight="bold" fontSize="xl" area={"feature_section"}>
        <VStack align="left">
          <HStack>
            <Icon as={FaUser} />
            <Text>@{ad?.op_username}</Text>
            <Text>({ad?.op_fullname})</Text>
          </HStack>
          <HStack>
            <Icon as={FaCalendarDay} />
            <Text>{ad?.createdAt}</Text>
          </HStack>
          <HStack>
            <Icon as={FaThList} />
            <Text>{ad?.category_name}</Text>
          </HStack>
          {ad?.price ? (
            <>
              <HStack>
                <Icon as={FaDollarSign} />
                <Text>BDT {ad?.price}</Text>
                {ad.is_negotiable ? (
                  <Badge colorScheme="green" borderRadius="md">
                    Negotiable
                  </Badge>
                ) : null}
              </HStack>
            </>
          ) : null}

          {ad?.days_used ? (
            <HStack>
              <Icon as={FaClock} />
              {ad.days_used.years !== 0 ? (
                <Text>{ad.days_used.years} years</Text>
              ) : null}
              {ad.days_used.months !== 0 ? (
                <Text>{ad.days_used.months} months</Text>
              ) : null}
              {ad.days_used.days !== 0 ? (
                <Text>{ad.days_used.days} days</Text>
              ) : null}
            </HStack>
          ) : null}
        </VStack>
      </GridItem>
      <GridItem pl="2" area={"details_section"}>
        {ad?.description}
      </GridItem>

      <GridItem area={"button_section"}>
        <Divider />
        <HStack py="4" spacing={4} direction="row" justify="right">
          <Button leftIcon={<ChatIcon />} colorScheme="teal" size="lg">
            Chat
          </Button>
          <Button leftIcon={<FaMapMarkerAlt />} colorScheme="teal" size="lg">
            Address
          </Button>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default AdDetils;
