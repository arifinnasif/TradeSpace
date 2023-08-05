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

const Register = ({ onNext, onPrev }) => {
  return (
    <Flex
      minH={'85vh'}
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
          <Heading fontSize={'4xl'}>Register your account</Heading>
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
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register;