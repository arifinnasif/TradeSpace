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
} from "@chakra-ui/react";
import { FunctionComponent } from "react";



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




  // declaration of touched states and action




  // change events definition
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.value.split(","))
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
    </>
  );
}

export default Step3;