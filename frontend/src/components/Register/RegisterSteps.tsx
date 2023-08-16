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
import { registrationService } from "../../services/registration.service";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };

  const [cookies, setCookie] = useCookies(["token"]);

  const registerButtonAction = async () => {
    try {
      const response = await registrationService.register({
        username: username,
        name: userfullname,
        phone: "+88" + phone,
        dob: dob,
        gender: gender,
        email: email,
        password: password,
      });
      console.log(response);

      setCookie("token", response.data.token);

      const response_status = response.status;
      if (response_status >= 200 && response_status < 300) handleNextStep();
    } catch (error) {
      console.log(error);
      // show toast
    }
  };

  const verifyButtonAction = async () => {
    setIsVerifyPressable(false);
    try {
      const response_status = (
        await registrationService.verifyPhone({
          phone: "+88" + phone,
          otp: otp,
        })
      ).status;
      if (response_status >= 200 && response_status < 300) {
        // show toast
        // wait for 3 seconds
        // redirect to /

        navigate("/");
      } else {
        // show error toast
        setIsVerifyPressable(true);
      }
    } catch (error) {
      console.log(error);
      // show toast
      setIsVerifyPressable(true);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
  };

  const [username, setUsername] = useState<string>();
  const [userfullname, setUserfullname] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [dob, setDob] = useState("1999-12-31");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [otp, setOtp] = useState<string>();
  const [isVerifyPressable, setIsVerifyPressable] = useState<boolean>(true);

  const navigate = useNavigate();

  return (
    <>
      <Progress value={progress} size="xs" colorScheme="teal" />
      {step === 1 && (
        <RegisterForm
          header={header[0]}
          formContent={
            <Step1
              onNext={handleNextStep}
              email={email}
              userfullname={userfullname}
              phone={phone}
              dob={dob}
              gender={gender}
              setEmail={setEmail}
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
              onNext={registerButtonAction}
              onPrev={handlePrevStep}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
      )}
      {step === 3 && (
        <RegisterForm
          header={header[2]}
          formContent={
            <Step3
              isVerifyPressable={isVerifyPressable}
              verifyButtonAction={verifyButtonAction}
              otp={otp}
              setOtp={setOtp}
            />
          }
        />
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
