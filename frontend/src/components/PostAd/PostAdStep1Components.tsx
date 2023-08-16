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



interface Step1Props {
  onNext: () => void;
  category: string;
  title: string;
  description: string;
  setCategory: (name: string) => void;
  setTitle: (name: string) => void;
  setDescription: (phone: string) => void;
}



const Step1 = () => {
  return (
    <>
      This is step 1 of the form
    </>
  );
}

export default Step1;