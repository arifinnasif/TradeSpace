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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaThList,
  FaClock,
  FaDollarSign,
  FaCalendarDay,
  FaMapMarkerAlt,
  FaMedal,
} from "react-icons/fa";
import { AdDetailsType } from "../../services/ad.service";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// this particular import is important
// it is the only way to make leaflet work with react
// without it, the map will show up with different tiles popping up
// at different positions like there's no tomorrow
// Also a height is required for the map to show up
// I set the height at 500px in the PopoverContent
import "leaflet/dist/leaflet.css";

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
// created_at: string,
// }

const AdDetils: FunctionComponent<AdDetailsType> = (ad) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [ad, setAd] = useState<AdDetailsType>();
  // const { id } = useParams();
  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true);
  //     const ad_details = await adService.getAdDetails(+id!);
  //     setAd(ad_details);
  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, [id]);

  const [showMap, setShowMap] = useState(false);
  const handleShowMap = () => {
    setShowMap(!showMap);
  };

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
        <Image boxSize="400px" objectFit="cover" src={ad?.image1} />
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
            <Text>{ad?.created_at}</Text>
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
          {/* <Button leftIcon={<FaMapMarkerAlt />} colorScheme="teal" size="lg">
            Address
          </Button> */}
          <Popover placement="bottom" closeOnBlur={false} isOpen={showMap}>
            <PopoverTrigger>
              {/* <Button onClick={handleShowMap}>
                  Mark Location on Map
                </Button> */}
              <Button
                onClick={handleShowMap}
                bg={"blue.500"}
                color={"white"}
                _hover={{
                  bg: "blue.800",
                }}
              >
                See Pickup point on Map
              </Button>
            </PopoverTrigger>
            <PopoverContent
              style={{ width: "500px", height: "500px", overflow: "hidden" }}
            >
              <PopoverArrow />
              <PopoverCloseButton onClick={() => setShowMap(false)} />
              <PopoverHeader>Pick up address</PopoverHeader>
              <PopoverBody
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <MapContainer
                    center={[ad.address!.latitude, ad.address!.longitude]}
                    zoom={17}
                    scrollWheelZoom={false}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[ad!.address!.latitude, ad!.address!.longitude]}
                      draggable={false}
                    >
                      {/* make the pop-up open by default */}
                      <Popup>{ad.address!.description}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default AdDetils;
