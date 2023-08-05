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
} from '@chakra-ui/react'

import React from 'react'

import { Radio, RadioGroup } from '@chakra-ui/react'

const Register = ({ onNext, onPrev }) => {
  const [value, setValue] = React.useState('1')
  return (
    <Flex
      minW={'85vw'}

      align={'center'}
      justify={'center'}
      
      bg={useColorModeValue('teal.50', 'gray.800')}>
      <Stack 
        spacing={8} 
        mx={'auto'} 
        maxW={'lg'} 
        py={12} 
        px={6} 
        minW={'35vw'}
        minH={'100vh'}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Provide your information</Heading>
          <Text fontSize={'lg'}>
            Stay with <Text as="span" color={'blue.400'}>TradeSpace</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
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
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register;