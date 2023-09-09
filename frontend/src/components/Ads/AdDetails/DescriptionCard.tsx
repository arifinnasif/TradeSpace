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
  useDisclosure,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FunctionComponent, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import MapModal from "./MapModal";
import React from "react";
import { getThread } from "../../../services/chat.service";

interface DescriptionCardProps {
  description?: string;
  address_longitude: number;
  address_latitude: number;
  address_description: string;
  handleChatClick: () => void;
}

const DescriptionCard: FunctionComponent<DescriptionCardProps> = ({
  description,
  address_longitude,
  address_latitude,
  address_description,
  handleChatClick,
}) => {
  const [showMap, setShowMap] = useState(false);
  const handleShowMap = () => {
    setShowMap(!showMap);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Card
        ref={finalRef}
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
          <Button
            leftIcon={<ChatIcon />}
            margin={2}
            colorScheme="teal"
            onClick={handleChatClick}
          >
            Chat
          </Button>

          <Button
            onClick={(e) => {
              handleShowMap();
              onOpen();
            }}
            leftIcon={<FaMapMarkerAlt />}
            margin={2}
            colorScheme="teal"
          >
            Map
          </Button>
        </CardFooter>
      </Card>
      <MapModal
        address_latitude={address_latitude}
        address_longitude={address_longitude}
        address_description={address_description}
        initialRef={initialRef}
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default DescriptionCard;
