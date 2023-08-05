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

const Register = () => {
  const [value, setValue] = React.useState('1')
  return (
    <Flex
      minH={'85vh'}
      minW={'85vw'}

      align={'center'}
      justify={'center'}
      
      bg={useColorModeValue('teal.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
            <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
                <Radio value='1'>First</Radio>
                <Radio value='2'>Second</Radio>
                <Radio value='3'>Third</Radio>
            </Stack>
            </RadioGroup>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register;