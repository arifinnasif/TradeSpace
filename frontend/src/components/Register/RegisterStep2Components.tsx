// @ts-nocheck

'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Radio, 
  RadioGroup,
} from '@chakra-ui/react'

import React from 'react'

const Step2 = ({ onNext, onPrev}) => {
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