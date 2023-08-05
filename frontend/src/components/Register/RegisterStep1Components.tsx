'use client'

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Radio, 
  RadioGroup,
} from '@chakra-ui/react'

import React, { FunctionComponent } from 'react'

interface Props {
    onNext: () => void
}

const Step1:FunctionComponent<Props> = ({ onNext}) => {
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