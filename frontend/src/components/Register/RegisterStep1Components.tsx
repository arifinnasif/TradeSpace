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

const Step1 = ({ onNext}) => {
    const [value, setValue] = React.useState('1');
    return(
        <>
        <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" />
        </FormControl>
        <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input type="tel" />
        </FormControl>
        <FormControl id="dob">
            <FormLabel>Birthdate</FormLabel>
            <Input type="date" />
        </FormControl>
        {/* gender selector radio */}
        <FormControl id="dob">
            <FormLabel>Gender</FormLabel>
            <RadioGroup onChange={setValue} value={value}>
        <Stack direction='row'>
            <Radio value='1'>Male</Radio>
            <Radio value='2'>Female</Radio>
        </Stack>
        </RadioGroup>
        </FormControl>
        
        <Button
        onClick={onNext}
        bg={'teal.400'}
        color={'white'}
        _hover={{
            bg: 'blue.500',
        }}>
        Next
        </Button>
    </>
    )
    
}

export default Step1