"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";




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


  // declaration of error states
  const [priceError, setPriceError] = useState<boolean>(false)
  const [days_usedError, setDays_usedError] = useState<boolean>(false)





  // declaration of touched states and action
  const [priceTouched, setPriceTouched] = useState<boolean>(false)
  const handlePriceTouched = () => {
    setPriceTouched(true)
  }

  const [days_usedTouched, setDays_usedTouched] = useState<boolean>(false)
  const handleDays_usedTouched = () => {
    setDays_usedTouched(true)
  }

  



  // change events definition
  const handleIs_sell_adChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsSellAd(e.target.checked)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value))
  }

  const handleIs_negotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNegotiable(e.target.checked)
  }

  const handleIs_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUsed(e.target.checked)
  }

  const handleDays_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysUsed(parseInt(e.target.value))
  }



  
  return (
    <>
      <FormControl>
        <Checkbox isChecked={is_sell_ad} onChange={handleIs_sell_adChange}>
          This ad is a sell Ad
        </Checkbox>
      </FormControl>

      <FormControl isRequired isInvalid={priceError} onBlur={handlePriceTouched}>
        <FormLabel>Price</FormLabel>
        <Input type="number" placeholder="Price" value={price} onChange={handlePriceChange} />
        {priceError && <FormErrorMessage>Price should be a positive number</FormErrorMessage>}
      </FormControl>

      <FormControl>

        <HStack spacing='200'>
          <Checkbox isChecked={is_negotiable} onChange={handleIs_negotiableChange}>
          Price is negotiable
          </Checkbox>
          <Checkbox isChecked={is_used} onChange={handleIs_usedChange}>
          Product is used before
          </Checkbox>
        </HStack>
        
      </FormControl>

      {
        is_used && 
        (
        <FormControl isRequired isInvalid={days_usedError} onBlur={handleDays_usedTouched}>
          <FormLabel>Days used</FormLabel>
          <Input type="number" placeholder="Days used" value={days_used} onChange={handleDays_usedChange} />
          {days_usedError && <FormErrorMessage>Days used should be a positive number</FormErrorMessage>}
        </FormControl>
        )
      }
    </>
  );
}

export default Step2;