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
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FunctionComponent, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import MapModal from "../../../Ads/AdDetails/MapModal";
import React from "react";
import { approveAReview } from "../../../../services/admin.service";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface DescriptionCardProps {
  ad_id: number;
  description?: string;
  address_longitude: number;
  address_latitude: number;
  address_description: string;
}

const DescriptionCard: FunctionComponent<DescriptionCardProps> = ({
  ad_id,
  description,
  address_longitude,
  address_latitude,
  address_description,
}) => {
  const [showMap, setShowMap] = useState(false);
  const handleShowMap = () => {
    setShowMap(!showMap);
  };

  const toast = useToast();
  const approveButtonAction = async (review_id: number) => {
    setIsApproveButtonLoading(true);
    console.log("approve button clicked", review_id);
    try {
      await approveAReview(review_id);
      toast({
        title: "Ad approved successfully",
        status: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log(error);
      toast({
        title: "Cannot approve this ad",
        description: error.message,
        status: "error",
      });
    }
    setIsApproveButtonLoading(false);
  };

  const {
    isOpen: isDeclinationOpen,
    onOpen: onDeclinationOpen,
    onClose: onDeclinationClose,
  } = useDisclosure();

  const initialDeclinationRef = React.useRef(null);

  const [isApproveButtonLoading, setIsApproveButtonLoading] =
    React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const navigate = useNavigate();

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
            isLoading={isApproveButtonLoading}
            colorScheme="teal"
            leftIcon={<FaRegCircleCheck />}
            spinner={<Spinner size={"md"} color="white" />}
            onClick={async () => {
              await approveButtonAction(ad_id);
              navigate("/admin/ad_reviews");
            }}
          >
            Approve
          </Button>
          <Button
            colorScheme="teal"
            leftIcon={<FaRegCircleXmark />}
            onClick={(e) => {
              console.log(e);
              onDeclinationOpen();
              // declineButtonAction(+id);
            }}
          >
            Decline
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
