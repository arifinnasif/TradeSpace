"use client";

import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const Step3 = () => {
  return (
    <>
      <FormControl id="otp">
        <FormLabel>Verification OTP:</FormLabel>
        <Input type="number" />
      </FormControl>

      <Link to="/">
        <Button
          w={"full"}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Login
        </Button>
      </Link>
    </>
  );
};

export default Step3;
