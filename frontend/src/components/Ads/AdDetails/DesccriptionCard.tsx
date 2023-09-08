import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Center,
  AbsoluteCenter,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FunctionComponent, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface DesccriptionCardProps {
  description?: string;
  address_longitude: number;
  address_latitude: number;
  address_description: string;
}

const DescriptionCard: FunctionComponent<DesccriptionCardProps> = ({
  description,
  address_longitude,
  address_latitude,
  address_description,
}) => {
  const [showMap, setShowMap] = useState(false);
  const handleShowMap = () => {
    setShowMap(!showMap);
  };

  return (
    <Card
      width={{ base: "100%" }}
      height="md"
      //   direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant={"elevated"}
      shadow={"xl"}
      mt={6}
      bg={useColorModeValue("teal.50", "teal.900")}
    >
      <CardHeader>
        <Heading size="xl">Description</Heading>
        <Divider />
      </CardHeader>
      {description && <CardBody>{description}</CardBody>}
      <CardFooter>
        <Button leftIcon={<ChatIcon />} margin={2} colorScheme="teal">
          Chat
        </Button>

        <Button leftIcon={<FaMapMarkerAlt />} margin={2} colorScheme="teal">
          Map
        </Button>
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
                  center={[address_latitude, address_longitude]}
                  zoom={17}
                  scrollWheelZoom={false}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[address_latitude, address_longitude]}
                    draggable={false}
                  >
                    {/* make the pop-up open by default */}
                    <Popup>{address_description}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default DescriptionCard;
