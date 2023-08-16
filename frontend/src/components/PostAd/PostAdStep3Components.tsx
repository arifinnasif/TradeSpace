"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Radio,
  RadioGroup,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";



interface Step3Props {
  onNext: () => void;
  images: string[];
  is_phone_public: boolean;
  address: string;
  setImages: (images: string[]) => void;
  setIsPhonePublic: (is_phone_public: boolean) => void;
  setAddress: (address: string) => void;
}


const Step3 = () => {
  return (
    <>
      This is step 3 of the form
    </>
  );
}

export default Step3;