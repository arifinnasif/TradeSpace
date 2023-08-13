"use client";

import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import { FormEvent, FunctionComponent } from "react";

import validator from "validator";

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  username?: string;
  password?: string;
  setUsername: (email: string) => void;
  setPassword: (password: string) => void;
}

const Step2: FunctionComponent<Step2Props> = ({
  onNext,
  onPrev,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  const isCurrentInputInValid = () => {
    return (
      username == undefined ||
      password == undefined ||
      isUsernameInValid() ||
      isPasswordInValid()
    );
  };

  const isUsernameInValid = () => {
    if (username == undefined) return false;
    if (username.length < 4) return true;
    const allowed =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890._-".split(
        ""
      );

    return !validator.isWhitelisted(username, allowed);
  };

  const isPasswordInValid = () => {
    if (password == undefined) return false;
    if (password.length < 8) return true;
    return false;
  };

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setUsername(tmp);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setPassword(tmp);
  };

  return (
    <>
      <FormControl id="username" isInvalid={isUsernameInValid()}>
        <FormLabel>Username</FormLabel>
        <Input
          type="username"
          value={username}
          onChange={handleUsernameChange}
        />
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
