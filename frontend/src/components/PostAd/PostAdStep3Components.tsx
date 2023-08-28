"use client";

import { AddIcon } from "@chakra-ui/icons";
import {
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Checkbox,
  FormErrorMessage,
  Box,
  Flex,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { uploadFile } from "../../services/fileupload.service";

interface Step3Props {
  onPrev: () => void;
  onNext: () => void;
  images: string[];
  is_phone_public: boolean;
  address?: string;
  setImages: (images: string[]) => void;
  setIsPhonePublic: (is_phone_public: boolean) => void;
  setAddress: (address: string) => void;
}

const Step3: FunctionComponent<Step3Props> = ({
  onPrev,
  onNext,
  images,
  is_phone_public,
  address,
  setImages,
  setIsPhonePublic,
  setAddress,
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

  // declaration of error states
  const [addressError, setAddressError] = useState<boolean>(false);

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

  // validation function
  const isUserInputValid = () => {
    if (
      addressError ||
      address == undefined ||
      address.length < 5 ||
      address.length > 50
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
      console.log(images);
      onNext();
    } else {
      console.log("Invalid Inputs");
      toast({
        title: "Invalid Inputs",
        description: "Please check your inputs and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
        />
        {addressError && (
          <FormErrorMessage>
            Address should be at the range of 5-50 characters
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
