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

import validator from "validator";

import { FormEvent, FunctionComponent } from "react";

interface Step1Props {
  onNext: () => void;
  username?: string;
  userfullname?: string;
  phone?: string;
  dob: string;
  gender: string;
  setUsername: (name: string) => void;
  setUserfullname: (name: string) => void;
  setPhone: (phone: string) => void;
  setDob: (dob: string) => void;
  setGender: (gender: string) => void;
}

const Step1: FunctionComponent<Step1Props> = ({
  onNext,
  username,
  userfullname,
  phone,
  dob,
  gender,
  setUsername,
  setUserfullname,
  setPhone,
  setDob,
  setGender,
}) => {
  const isCurrentInputInValid = () => {
    return (
      userfullname == undefined ||
      username == undefined ||
      phone == undefined ||
      isUsernameInValid() ||
      isUserfullnameInValid() ||
      isPhoneInValid() ||
      isDobInValid() ||
      (gender !== "male" && gender !== "female")
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

  const isUserfullnameInValid = () => {
    if (userfullname == undefined) return false;
    if (userfullname.length < 4) return true;
    const allowed = "abcdefghijklmnopqrstuvwxyz ".split("");

    return !validator.isWhitelisted(userfullname.toLowerCase(), allowed);
  };

  const isPhoneInValid = () => {
    if (phone == undefined) return false;
    if (phone.length !== 11) return true;

    return !validator.isNumeric(phone);
  };

  const isDobInValid = () => {
    if (new Date().getFullYear() - new Date(dob).getFullYear() < 18)
      return true;
    return false;
  };

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setUsername(tmp);
  };

  const handleUserfullnameChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setUserfullname(tmp);
  };

  const handlePhoneChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setPhone(tmp);
  };

  const handleDobChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setDob(tmp);
  };

  const handleGenderChange = (arg: string) => {
    if (arg === "male") setGender("male");
    else if (arg === "female") setGender("female");
    else setGender("male");
    console.log(arg);
    console.log(gender);
  };

  return (
    <>
      <FormControl id="username" isInvalid={isUsernameInValid()}>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={username} onChange={handleUsernameChange} />
      </FormControl>
      <FormControl id="userfullname" isInvalid={isUserfullnameInValid()}>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          value={userfullname}
          onChange={handleUserfullnameChange}
        />
      </FormControl>
      <FormControl id="phone" isInvalid={isPhoneInValid()}>
        <FormLabel>Phone</FormLabel>
        <InputGroup>
          <InputLeftAddon children="+88" />
          <Input type="tel" value={phone} onChange={handlePhoneChange} />
        </InputGroup>
      </FormControl>
      <FormControl id="dob" isInvalid={isDobInValid()}>
        <FormLabel>Birthdate</FormLabel>
        <Input type="date" value={dob} onChange={handleDobChange} />
      </FormControl>
      {/* gender selector radio */}
      <FormControl id="dob">
        <FormLabel>Gender</FormLabel>
        <RadioGroup onChange={handleGenderChange} value={gender}>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Button
        isDisabled={isCurrentInputInValid()}
        onClick={onNext}
        bg={"teal.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
      >
        Next
      </Button>
    </>
  );
};

export default Step1;
