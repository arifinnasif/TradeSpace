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
import { FunctionComponent, useState } from "react";
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
import { TileLayer } from "leaflet";
import { MapContainer } from "react-leaflet";

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
    // set a random number as key to force re-render
    setMapKey(Math.random());
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
          {/* <Button leftIcon={<FaMapMarkerAlt />} colorScheme="teal" size="lg">
            Address
          </Button> */}
          <Popover  placement="bottom" 
                    closeOnBlur={false} 
                    isOpen={showMap} 
          > 
              <PopoverTrigger>
                {/* <Button onClick={handleShowMap}>
                  Mark Location on Map
                </Button> */}
                <Button
                  onClick={handleShowMap}
                  bg={"blue.500"}
                  color={"white"}
                  width={"100%"}
                  _hover={{
                    bg: "blue.800",
                  }}
                >
                  Mark Location on Map
                </Button>
              </PopoverTrigger>
              <PopoverContent style={{ width: '500px', height: '500px', overflow: 'hidden'}}>
                <PopoverArrow />
                <PopoverCloseButton onClick={() => setShowMap(false)}/>
                <PopoverHeader>
                  Choose your address on map
                  {/* add a search box later if possible */}
                  {/* <FormControl>
                    <ReactSearchAutocomplete items={countries}
                                              onSelect={(item) => console.log(item)}
                                              autoFocus
                                              styling={{borderRadius: '5px', zIndex: 9999}}
                                              placeholder="Search for your address"

                    />
                  </FormControl> */}
                </PopoverHeader>
                <PopoverBody style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
                  
                              
                  <MapContainer
                    center={[ad!.latitude, ad!.longitude]}
                    zoom={17}
                    scrollWheelZoom={false}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* <Marker position={position}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker> */}
                    <LocationMarker markerPosition={markerPosition}
                                    setMapCenter={setMapCenter}
                                    setMarkerPosition={setMarkerPosition}
                    />
                  </MapContainer>
                </div>
                </PopoverBody>
                
                {markerPosition && (
                  <div>
                    <p>Current Latitude: {markerPosition.lat.toFixed(6)}</p>
                    <p>Current Longitude: {markerPosition.lng.toFixed(6)}</p>
                  </div>
                )}
              </PopoverContent>
            </Popover>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default AdDetils;
