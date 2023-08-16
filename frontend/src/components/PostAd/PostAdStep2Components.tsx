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




interface Step2Props {
  onNext: () => void;
  is_sell_ad: boolean;
  price: number;
  is_negotiable: boolean;
  is_used: boolean;
  days_used?: number;
  setIsSellAd: (is_sell_ad: boolean) => void;
  setPrice: (price: number) => void;
  setIsNegotiable: (is_negotiable: boolean) => void;
  setIsUsed: (is_used: boolean) => void;
  setDaysUsed: (days_used: number) => void;
}


const Step2 = () => {
  return (
    <>
      This is step 2 of the form
    </>
  );
}

export default Step2;