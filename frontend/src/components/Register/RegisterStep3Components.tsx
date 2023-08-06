"use client";

import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import validator from "validator";

import { FormEvent, FunctionComponent } from "react";

interface Step3Props {
  otp?: string;
  setOtp: (otp: string) => void;
}

const Step3: FunctionComponent<Step3Props> = ({ otp, setOtp }) => {
  const isCurrentInputInValid = () => {
    return otp == undefined || isOtpInValid();
  };
  const isOtpInValid = () => {
    if (otp == undefined) return false;
    if (otp.length !== 6) return true;
    return !validator.isNumeric(otp);
  };
  const handleOtpChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setOtp(tmp);
  };
  return (
    <>
      <FormControl id="otp" isInvalid={isOtpInValid()}>
        <FormLabel>Verification OTP:</FormLabel>
        <Input type="number" value={otp} onChange={handleOtpChange} />
      </FormControl>

      <Button
        isDisabled={isCurrentInputInValid()}
        w={"full"}
        bg={"teal.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
      >
        Verify
      </Button>
    </>
  );
};

export default Step3;
