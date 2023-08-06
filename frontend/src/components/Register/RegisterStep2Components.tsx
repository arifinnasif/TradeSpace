'use client'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

import { FunctionComponent } from "react";

interface Props {
    onNext: () => void
    onPrev: () => void
}

const Step2:FunctionComponent<Props> = ({ onNext, onPrev}) => {
    return(
        <>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
            </FormControl>
            <Flex justifyContent={'space-between'}>
            <Button
                onClick={onPrev}
                bg={'teal.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}>
                Previous
            </Button>
            <Button
                onClick={onNext}
                bg={'teal.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}>
                Register
            </Button>
            </Flex>
        </>
    )
    
}

export default Step2