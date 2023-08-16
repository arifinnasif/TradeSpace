"use client";

import { useState } from "react";
import {
  Progress,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

const PostAdComponent = () => {

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);


  // Headers to show at different steps
  // of the form
  const header = [
    "Provide your information",
    "Register your Account",
    "Verify your Account",
  ];



  // after pressing next button
  const handleNextStep = () => {
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };



  // after pressing previous button
  const handlePrevStep = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
  };


  return (
    <>
    </>
  );
};

export default PostAdComponent;