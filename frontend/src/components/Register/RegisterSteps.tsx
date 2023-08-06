"use client";

import { useState } from "react";
import {
  Progress,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

import RegisterForm from "./RegisterForm";
import Step1 from "./RegisterStep1Components";
import Step2 from "./RegisterStep2Components";
import Step3 from "./RegisterStep3Components";

const Register = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const header = [
    "Provide your information",
    "Register your Account",
    "Verify your Account",
  ];

  const handleNextStep = () => {
    console.log(email);
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
  };

  let [username, setUsername] = useState<string>();
  let [userfullname, setUserfullname] = useState<string>();
  let [phone, setPhone] = useState<string>();
  let [dob, setDob] = useState("1999-12-31");
  let [gender, setGender] = useState("male");
  let [email, setEmail] = useState<string>();
  let [password, setPassword] = useState<string>();

  return (
    <>
      <Progress value={progress} size="xs" colorScheme="teal" />
      {step === 1 && (
        <RegisterForm
          header={header[0]}
          formContent={
            <Step1
              onNext={handleNextStep}
              username={username}
              userfullname={userfullname}
              phone={phone}
              dob={dob}
              gender={gender}
              setUsername={setUsername}
              setUserfullname={setUserfullname}
              setPhone={setPhone}
              setDob={setDob}
              setGender={setGender}
            />
          }
        />
      )}
      {step === 2 && (
        <RegisterForm
          header={header[1]}
          formContent={
            <Step2
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          }
        />
      )}
      {step === 3 && (
        <RegisterForm header={header[2]} formContent={<Step3 />} />
      )}
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          {step === 3 ? (
            <Button
              w="7rem"
              colorScheme="red"
              variant="solid"
              onClick={() => {
                toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </>
  );
};

export default Register;
