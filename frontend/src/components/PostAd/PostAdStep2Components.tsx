"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  FormErrorMessage,
  HStack,
  Flex,
  Button,
  useToast,
  InputGroup,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";




interface Step2Props {
  onPrev: () => void;
  onNext: () => void;
  is_sell_ad: boolean;
  price?: number;
  is_negotiable: boolean;
  is_used: boolean;
  years_used?: number;
  months_used?: number;
  days_used?: number;
  setIsSellAd: (is_sell_ad: boolean) => void;
  setPrice: (price: number) => void;
  setIsNegotiable: (is_negotiable: boolean) => void;
  setIsUsed: (is_used: boolean) => void;
  setYearsUsed: (years_used: number|undefined) => void;
  setMonthsUsed: (months_used: number|undefined) => void;
  setDaysUsed: (days_used: number|undefined) => void;
}


const Step2: FunctionComponent<Step2Props> = ({
  onPrev,
  onNext,
  is_sell_ad,
  price,
  is_negotiable,
  is_used,
  years_used,
  months_used,
  days_used,
  setIsSellAd,
  setPrice,
  setIsNegotiable,
  setIsUsed,
  setYearsUsed,
  setMonthsUsed,
  setDaysUsed,
}) => {


  // declaration of error states
  const [priceError, setPriceError] = useState<boolean>(false)
  const [years_usedError, setYears_usedError] = useState<boolean>(false)
  const [months_usedError, setMonths_usedError] = useState<boolean>(false)
  const [days_usedError, setDays_usedError] = useState<boolean>(false)
  const [daysInputError, setDaysInputError] = useState<boolean>(false)





  // declaration of touched states and action
  const [priceTouched, setPriceTouched] = useState<boolean>(false)
  const handlePriceTouched = () => {
    setPriceTouched(true)
  }

  // const [years_usedTouched, setYears_usedTouched] = useState<boolean>(false)
  // const handleYears_usedTouched = () => {
  //   setYears_usedTouched(true)
  // }

  // const [months_usedTouched, setMonths_usedTouched] = useState<boolean>(false)
  // const handleMonths_usedTouched = () => {
  //   setMonths_usedTouched(true)
  // }

  // const [days_usedTouched, setDays_usedTouched] = useState<boolean>(false)
  // const handleDays_usedTouched = () => {
  //   setDays_usedTouched(true)
  // }

  const [daysInputTouched, setDaysInputTouched] = useState<boolean>(false)
  const handleDaysInputTouched = () => {
    setDaysInputTouched(true)
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

  const handleYears_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearsUsed(parseInt(e.target.value))
  }

  const handleMonths_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthsUsed(parseInt(e.target.value))
  }

  const handleDays_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysUsed(parseInt(e.target.value))
  }




  // error checking hooks for constant supervision

  // necessary for the days_used field.
  // let a user checks is_used and set days used 10.
  // but then then unchecks is_used. 
  // guess what happens to days_used? it stays 10.
  // so we need to reset it to undefined.
  useEffect(() => {
    if (is_used == false) {
      setYearsUsed(undefined)
      setMonthsUsed(undefined)
      setDaysUsed(undefined)
    }
  }, [is_used])

  useEffect(() => {
    if (priceTouched && (price == undefined || price < 0)) {
      setPriceError(true)
    } else {
      setPriceError(false)
    }
  }, [price, priceTouched])

  useEffect(() => {
    if (daysInputTouched && (is_used == true && (years_used != undefined && years_used < 0))) {
      setYears_usedError(true)
    } else {
      setYears_usedError(false)
    }
  }, [years_used,
      is_used,
      daysInputTouched]
  )

  useEffect(() => {
    if (daysInputTouched && (is_used == true && (months_used != undefined && (months_used < 0 || months_used > 11)))) {
      setMonths_usedError(true)
    } else {
      setMonths_usedError(false)
    }
  }, [months_used,
      is_used,
      daysInputTouched]
  )

  useEffect(() => {
    if (daysInputTouched && (is_used == true && (days_used != undefined && (days_used < 0 || days_used > 30)))) {
      setDays_usedError(true)
    } else {
      setDays_usedError(false)
    }
  }, [days_used, 
      is_used, 
      daysInputTouched]
  )

  useEffect(() => {
    if (daysInputTouched && is_used == true && years_used == undefined && months_used == undefined && days_used == undefined) {
      setDaysInputError(true)
    } else {
      setDaysInputError(false)
    }
  }, [years_used, 
      months_used, 
      days_used, 
      is_used,
      daysInputTouched]
  )



  // validation function
  const isUserInputValid = () => {
    if (priceError || price == undefined || price < 0 ||
        daysInputError || (is_used == true && years_used == undefined && months_used == undefined && days_used == undefined) ||
        years_usedError || (is_used == true && (years_used != undefined && years_used < 0)) ||
        months_usedError || (is_used == true && (months_used != undefined && (months_used < 0 || months_used > 11))) ||
        days_usedError || (is_used == true && (days_used != undefined && (days_used < 0 || days_used > 30)))
       ) return false;

    return true;
  }

  const toast = useToast();

  
  const handleNextRequest = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isUserInputValid()){
      console.log(is_sell_ad)
      console.log(price)
      console.log(is_negotiable)
      console.log(is_used)
      console.log(years_used)
      console.log(months_used)
      console.log(days_used)
      onNext();
    }
    else {
      console.log("Invalid Inputs")
      toast({
        title: "Invalid Inputs",
        description: "Please check your inputs and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
        <FormControl isRequired 
                     isInvalid={daysInputError ||
                                years_usedError ||
                                months_usedError ||
                                days_usedError
                               } 
                     onBlur={handleDaysInputTouched}
        >
          <FormLabel>Days used</FormLabel>
            <InputGroup>
              <Input type="number" 
                     placeholder="Years" 
                     value={years_used} 
                     onChange={handleYears_usedChange}
                     isInvalid={years_usedError} 
              />
              <Input type="number" 
                     placeholder="Months" 
                     value={months_used} 
                     onChange={handleMonths_usedChange} 
                     isInvalid={months_usedError}
              />
              <Input type="number" 
                     placeholder="Days" 
                     value={days_used} 
                     onChange={handleDays_usedChange}
                     isInvalid={days_usedError} 
              />
            </InputGroup>
            {days_usedError && <FormErrorMessage>Days used should be a positive number less than 30</FormErrorMessage>}
            {daysInputError && <FormErrorMessage>Please enter a valid number of days</FormErrorMessage>}
            {years_usedError && <FormErrorMessage>Years used should be a positive number</FormErrorMessage>}
            {months_usedError && <FormErrorMessage>Months used should be a positive number less than 12</FormErrorMessage>}
        </FormControl>
        )
      }

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
}

export default Step2;