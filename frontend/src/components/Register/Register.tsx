'use client'

import { useState } from 'react'
import {
  Progress,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'


import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'


const Register = () => {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  const handleNextStep = () => {
    setStep(step + 1)
    if (step === 3) {
      setProgress(100)
    } else {
      setProgress(progress + 33.33)
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1)
    setProgress(progress - 33.33)
  };

  return (
    <>
        <Progress value={progress} size='xs' colorScheme='teal' />
        {step === 1 && <RegisterStep1 onNext={handleNextStep} onPrev={handlePrevStep}/>}
        {step === 2 && <RegisterStep2 onNext={handleNextStep} onPrev={handlePrevStep}/>}
        {step === 3 && <RegisterStep2 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between" alignItems='center'>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
    </>
  )
}

export default Register