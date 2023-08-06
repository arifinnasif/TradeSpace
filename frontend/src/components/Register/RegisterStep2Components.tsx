"use client";

import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import { FormEvent, FunctionComponent } from "react";

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  email?: string;
  password?: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const Step2: FunctionComponent<Step2Props> = ({
  onNext,
  onPrev,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const isCurrentInputInValid = () => {
    return (
      email == undefined ||
      password == undefined ||
      isEmailInValid() ||
      isPasswordInValid()
    );
  };
  const isEmailInValid = () => {
    if (email == undefined) return false;
    if (email.length < 8) return true;
    return false;
  };

  const isPasswordInValid = () => {
    if (password == undefined) return false;
    if (password.length < 8) return true;
    return false;
  };

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setEmail(tmp);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setPassword(tmp);
  };

  return (
    <>
      <FormControl id="email" isInvalid={isEmailInValid()}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange} />
      </FormControl>
      <FormControl id="password" isInvalid={isPasswordInValid()}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
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
          isDisabled={isCurrentInputInValid()}
          onClick={onNext}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Register
        </Button>
      </Flex>
    </>
  );
};

export default Step2;
