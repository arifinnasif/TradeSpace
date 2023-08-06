'use client'

import { useState } from 'react'
import {
  Progress,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'

import RegisterForm from './RegisterForm'
import Step1 from './RegisterStep1Components'
import Step2 from './RegisterStep2Components'
import Step3 from './RegisterStep3Components'


const Register = () => {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  const header = [
    'Provide your information',
    'Register your Account',
    'Verify your Account',
  ]

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
        {step === 1 && <RegisterForm header={header[0]} formContent={<Step1 onNext={handleNextStep}/>} />}
        {step === 2 && <RegisterForm header={header[1]} formContent={<Step2 onNext={handleNextStep} onPrev={handlePrevStep}/>} />}
        {step === 3 && <RegisterForm header={header[2]} formContent={<Step3 />} />}
    </>
  )
}

export default Register