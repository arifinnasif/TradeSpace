"use client";

import { useState } from "react";
import {
  Progress,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';


import Layout from "../../layout/Layout";
import PostAdForm from "./PostAdForm";
import Step1 from "./PostAdStep1Components";
import Step2 from "./PostAdStep2Components";
import Step3 from "./PostAdStep3Components";

const PostAdComponent = () => {

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // declaration of states
  const [category, setCategory] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [is_sell_ad, setIs_sell_ad] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const [is_negotiable, setIs_negotiable] = useState<boolean>(false)
  const [is_used, setIs_used] = useState<boolean>(false)
  const [days_used, setDays_used] = useState<number>()
  const [is_phone_public, setIs_phone_public] = useState<boolean>(false)
  const [address, setAddress] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [images, setImages] = useState<string[]>([])


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
      <Layout title="Hello" loading={isLoading}>
        <Progress value={progress} size="xs" colorScheme="teal" />
        {step === 1 && <PostAdForm header="Tell us about your product" 
                                   formContent= {<Step1 onNext={handleNextStep} 
                                                        category={category} 
                                                        setCategory={setCategory}
                                                        title={title}
                                                        setTitle={setTitle}
                                                        description={description}
                                                        setDescription={setDescription} 
                                                />} 
                       />
        }
        {step === 2 && <PostAdForm header="Step 1" formContent={<Step2 />} />}
        {step === 3 && <PostAdForm header="Step 1" formContent={<Step3 />} />}
      </Layout>
    </>
  );
};

export default PostAdComponent;