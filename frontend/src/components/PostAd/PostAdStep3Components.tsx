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
  FormHelperText,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";



interface Step3Props {
  onPrev: () => void;
  images: string[];
  is_phone_public: boolean;
  address?: string;
  setImages: (images: string[]) => void;
  setIsPhonePublic: (is_phone_public: boolean) => void;
  setAddress: (address: string) => void;
}


const Step3: FunctionComponent<Step3Props> = ({
  onPrev,
  images,
  is_phone_public,
  address,
  setImages,
  setIsPhonePublic,
  setAddress,
}) => {


  // declaration of error states
  const [addressError, setAddressError] = useState<boolean>(false)



  // declaration of touched states and action
  const [addressTouched, setAddressTouched] = useState<boolean>(false)
  const handleAddressTouched = () => {
    setAddressTouched(true)
  }




  // change events definition
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.value.split(","))
  }

  const handleIs_phone_publicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhonePublic(e.target.checked)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }





  // error checking hooks for constant supervision
  return (
    <>
      <FormControl>
        <FormLabel>Upload images</FormLabel>
        <input type = 'file' accept='image/*' multiple onChange={handleImagesChange} />
        {/* why not <Input .../> here? */}
        {/* Well it's just ugly for file imput. */}
        {/* Such is frontend */}
        <FormHelperText>Upload upto 5 images</FormHelperText>
      </FormControl>

      <FormControl>
        <Checkbox isChecked={is_phone_public} onChange={handleIs_phone_publicChange}>
          Make my phone number public for this Ad
        </Checkbox>
      </FormControl>

      <FormControl isRequired isInvalid={addressError} onBlur={handleAddressTouched}>
        <FormLabel>Address</FormLabel>
        <Input type="text" placeholder="Address" value={address} onChange={handleAddressChange} />
        {addressError && 
        <FormErrorMessage>Address should be at the range of 5-50 characters</FormErrorMessage>}
      </FormControl>
    </>
  );
}

export default Step3;