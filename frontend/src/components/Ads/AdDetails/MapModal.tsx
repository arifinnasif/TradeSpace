import { MutableRefObject } from "react";

import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  address_latitude: number;
  address_longitude: number;
  address_description: string;
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
}

const MapModal: FunctionComponent<MapModalProps> = ({
  address_latitude,
  address_longitude,
  address_description,
  initialRef,
  finalRef,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text maxWidth={"350px"} noOfLines={1}>
            Pick Up Location
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box
            style={{
              width: "100%",
              height: "300px",
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
                id="target"
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
          </Box>
        </ModalBody>

        <ModalFooter>{address_description}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
