"use client";

import { AddIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
  FormHelperText,
  Checkbox,
  FormErrorMessage,
  Box,
  Flex,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  HStack,
} from "@chakra-ui/react";

import { FunctionComponent, useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import { uploadFile } from "../../services/fileupload.service";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

// this particular import is important
// it is the only way to make leaflet work with react
// without it, the map will show up with different tiles popping up
// at different positions like there's no tomorrow
// Also a height is required for the map to show up
// I set the height at 500px in the PopoverContent
import "leaflet/dist/leaflet.css";
import { LatLng, marker } from "leaflet";

// This function is necessary for the map to show current location
function LocationMarker({
  markerPosition,
  setMarkerPosition,
  setMapCenter,
}: {
  markerPosition: LatLng | null;
  setMarkerPosition: (position: LatLng) => void;
  setMapCenter: (position: LatLng) => void;
}) {
  const map = useMapEvents({
    locationfound(e) {
      setMapCenter(e.latlng);
      setMarkerPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (markerPosition == null) map.locate();
  }, []);

  return markerPosition === null ? null : (
    <Marker
      position={markerPosition}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          setMarkerPosition(e.target.getLatLng());
        },
      }}
    >
      <Popup>Move the marker to show your address</Popup>
    </Marker>
  );
}

interface Step3Props {
  onPrev: () => void;
  onNext: () => void;
  images: string[];
  is_phone_public: boolean;
  address?: string;
  markerPosition: LatLng | null;
  mapCenter: LatLng;
  setImages: (images: string[]) => void;
  setIsPhonePublic: (is_phone_public: boolean) => void;
  setAddress: (address: string) => void;
  setMarkerPosition: (position: LatLng) => void;
  setMapCenter: (position: LatLng) => void;
}

const Step3: FunctionComponent<Step3Props> = ({
  onPrev,
  onNext,
  images,
  is_phone_public,
  address,
  markerPosition,
  mapCenter,
  setImages,
  setIsPhonePublic,
  setAddress,
  setMarkerPosition,
  setMapCenter,
}) => {
  // selectedFile
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isBusyUploading, setIsBusyUploading] = useState<boolean>(false);

  const selectFileClickAction = (arg_file: File) => {
    console.log(arg_file, isBusyUploading);
    if (arg_file == null && !isBusyUploading) return;
    setIsBusyUploading(true);
    console.log("started");
    uploadFile(arg_file!, "ads").then((url: string) => {
      setImages([...images, url]);
      setSelectedFile(null);
      setIsBusyUploading(false);
      console.log("done");
    });
  };
  // Map related states
  // const position = { lat: 51.5704, lng: 0.1276 }
  const initialPosition = new LatLng(51.5704, 0.1276);
  // const [position, setPosition] = useState<LatLng>(initialPosition);
  const [showMap, setShowMap] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  // map related functions
  const handleShowMap = () => {
    setShowMap(!showMap);
    // set a random number as key to force re-render
    setMapKey(Math.random());
  };

  // declaration of error states
  const [addressError, setAddressError] = useState<boolean>(false);
  const [mapError, setMapError] = useState<boolean>(false);

  // declaration of touched states and action
  const [addressTouched, setAddressTouched] = useState<boolean>(false);
  const handleAddressTouched = () => {
    setAddressTouched(true);
  };

  // change events definition
  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // setImages(e.target.value.split(","));
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    selectFileClickAction(e.target.files[0]);
  };

  const handleIs_phone_publicChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPhonePublic(e.target.checked);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  // error checking hooks for constant supervision
  useEffect(() => {
    if (
      addressTouched &&
      (address == undefined || address.length < 5 || address.length > 50)
    ) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  }, [address, addressTouched]);

  useEffect(() => {
    if (
      addressTouched &&
      (markerPosition == undefined || markerPosition == null)
    ) {
      setMapError(true);
    } else {
      setMapError(false);
    }
  }, [markerPosition, addressTouched]);

  // validation function
  const isUserInputValid = () => {
    if (
      addressError ||
      // mapError ||
      address == undefined ||
      address.length < 5 ||
      address.length > 50 ||
      markerPosition == undefined ||
      markerPosition == null
    )
      return false;

    return true;
  };

  const toast = useToast();

  const handleNextRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isUserInputValid()) {
      console.log(is_phone_public);
      console.log(address);
      console.log(markerPosition);
      console.log(images);
      onNext();
    } else {
      console.log("Invalid Inputs");
      toast({
        title: "Invalid Inputs",
        description:
          "Please check your inputs and try again.\nMake sure to place your address in the map",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  return (
    <>
      <FormControl>
        <FormLabel>Upload images</FormLabel>

        <HStack>
          {images.map((url, key) => (
            <Image boxSize="100px" objectFit="cover" key={key} src={url} />
          ))}
          <Input
            type="file"
            accept="image/*"
            isDisabled={isBusyUploading}
            onChange={handleImagesChange}
            style={{ display: "none" }}
            id="imageInput"
          />

          <label htmlFor="imageInput">
            <Input
              as={Box}
              display="flex"
              width="100px"
              height="100px"
              alignItems="center"
              justifyContent="center"
              border="1px dashed gray"
              borderRadius="md"
              cursor="pointer"
            >
              <AddIcon boxSize={8} />
            </Input>
          </label>
        </HStack>

        {/* why not <Input .../> here? */}
        {/* Well it's just ugly for file imput. */}
        {/* Such is frontend */}
        <FormHelperText>Upload upto 5 images</FormHelperText>
      </FormControl>

      <FormControl>
        <Checkbox
          isChecked={is_phone_public}
          onChange={handleIs_phone_publicChange}
        >
          Make my phone number public for this Ad
        </Checkbox>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={addressError}
        onBlur={handleAddressTouched}
      >
        <FormLabel>Describe your Address</FormLabel>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
        />
        {addressError && (
          <FormErrorMessage>
            Address description should be at the range of 5-50 characters
          </FormErrorMessage>
        )}

        <br />
        <br />

        <Popover
          placement="bottom"
          closeOnBlur={false}
          isOpen={showMap}
          //  key={mapKey}
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
          <PopoverContent
            style={{ width: "500px", height: "500px", overflow: "hidden" }}
          >
            <PopoverArrow />
            <PopoverCloseButton onClick={() => setShowMap(false)} />
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
                  center={mapCenter}
                  zoom={17}
                  scrollWheelZoom={false}
                  style={{ width: "100%", height: "100%" }}
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
                  <LocationMarker
                    markerPosition={markerPosition}
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
        {mapError && (
          <FormErrorMessage>
            Please place your address on the map
          </FormErrorMessage>
        )}
      </FormControl>

      <Flex justifyContent={"space-between"}>
        <Button
          onClick={onPrev}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Previous
        </Button>
        <Button
          // isDisabled={isCurrentInputInValid()}
          onClick={handleNextRequest}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};

export default Step3;
