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
  Checkbox,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";




interface Step2Props {
  onNext: () => void;
  is_sell_ad: boolean;
  price?: number;
  is_negotiable: boolean;
  is_used: boolean;
  days_used?: number;
  setIsSellAd: (is_sell_ad: boolean) => void;
  setPrice: (price: number) => void;
  setIsNegotiable: (is_negotiable: boolean) => void;
  setIsUsed: (is_used: boolean) => void;
  setDaysUsed: (days_used: number) => void;
}


const Step2: FunctionComponent<Step2Props> = ({
  onNext,
  is_sell_ad,
  price,
  is_negotiable,
  is_used,
  days_used,
  setIsSellAd,
  setPrice,
  setIsNegotiable,
  setIsUsed,
  setDaysUsed,
}) => {


  // change events definition
  const handleIs_sell_adChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsSellAd(e.target.checked)
  }

  return (
    <>
      <FormControl>
        <Checkbox isChecked={is_sell_ad} onChange={handleIs_sell_adChange}>
          This ad is a sell Ad
        </Checkbox>
      </FormControl>
    </>
  );
}

export default Step2;