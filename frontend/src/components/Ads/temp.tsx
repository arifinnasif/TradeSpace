import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Formik, useFormik } from "formik";

import {
  CheckboxSingleControl,
  InputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";
import { number } from "prop-types";

import React, {useState, useEffect, FormEvent} from 'react'

import * as Yup from "yup";

interface AdData {
  category: string,
  title: string,
  is_sell_ad: boolean,
  description: string,
  is_negotiable: boolean,
  is_used: boolean,
  days_used?: number,
  is_phone_public: boolean,
  address: string,
  price: number,
  images: string[],
}

const onAdd = ({category,
                title, 
                is_sell_ad, 
                description, 
                is_negotiable, 
                is_used, 
                days_used,  
                is_phone_public, 
                address, 
                price, 
                images}: AdData) => {
  const newAd:AdData = {category, 
                        title, 
                        is_sell_ad, 
                        description, 
                        is_negotiable, 
                        is_used, 
                        days_used, 
                        is_phone_public, 
                        address, 
                        price, 
                        images
                       }
  console.log(newAd)
}


const initialValues = {
  category: "",
  title: "",
  is_sell_ad: false,
  description: "",
  is_negotiable: false,
  is_used: false,
  days_used: undefined,
  is_phone_public: false,
  address: "",
  price: undefined,
  images: [],
};

const validationSchema = Yup.object({
title: Yup.string().required().min(5).max(50),
is_sell_ad: Yup.boolean(),
description: Yup.string().max(100),
price: Yup.number().required().min(0),
is_negotiable: Yup.boolean(),
is_used: Yup.boolean(),
days_used: Yup.number().min(0),
is_phone_public: Yup.boolean(),
address: Yup.string().required().min(5).max(50),
images: Yup.array().max(5),
});

const categories = [
  "Electronics",
  "Furniture",
  "Clothing",
]

const PostAd = () => {
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [is_sell_ad, setIs_sell_ad] = useState(false)
  const [description, setDescription] = useState('')
  const [is_negotiable, setIs_negotiable] = useState(false)
  const [is_used, setIs_used] = useState(false)
  const [days_used, setDays_used] = useState('')
  const [is_phone_public, setIs_phone_public] = useState(false)
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])


  const changeCategory = (e: FormEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value)
  }
  const changeTitle = (e:FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeIs_sell_ad = () => {
    setIs_sell_ad(!is_sell_ad)
  }
  const changeDescription = (e:FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }
  const changeIs_negotiable = () => {
    setIs_negotiable(!is_negotiable)
  }
  const changeIs_used = () => {
    setIs_used(!is_used)
  }
  const changeDays_used = (e:FormEvent<HTMLInputElement>) => {
    setDays_used(e.currentTarget.value)
  }
  const changeIs_phone_public = () => {
    setIs_phone_public(!is_phone_public)
  }
  const changeAddress = (e:FormEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value)
  }
  const changePrice = (e:FormEvent<HTMLInputElement>) => {
    setPrice(e.currentTarget.value)
  }
  const changeImages = (e:any) => {
    setImages(e.target.value)
  }

  const onSubmit = (e:any) => {
    e.preventDefault()
    console.log(price)

    if(title === '' || price === '' || address === '' || category === '') {
      alert('Please fill in all the required fields')
      return
    }
    if(title.length < 5 || title.length > 50) {
      alert('Title must be between 5 and 50 characters')
      return
    }
    if(description.length > 100) {
      alert('Description must be less than 100 characters')
      return
    }
    if(address.length < 5 || address.length > 50) {
      alert('Address must be between 5 and 50 characters')
      return
    }
    if(price < 0) {
      alert('Price must be greater than 0')
      return
    }
    if(days_used < 0) {
      alert('Days used must be greater than 0')
      return
    }
    if(images.length > 5) {
      alert('You can only upload 5 images')
      return
    }
    

    onAdd({category, 
            title, 
            is_sell_ad, 
            description, 
            is_negotiable, 
            is_used, 
            days_used, 
            is_phone_public, 
            address, 
            price, 
            images
          })

  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxW={"75vw"}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          {/* <SelectControl
            name="category"
            selectProps={{ placeholder: "Select Category" }}
            onChange={changeCategory}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </SelectControl> */}
          <br />
          
          {/* <InputControl name="title" label="Title" onChange={changeTitle} /> */}
          
          <br />
          {/* <CheckboxSingleControl name="is_sell_ad" onChange={changeIs_sell_ad}>
            Is a sell Ad
          </CheckboxSingleControl> */}

          <br />

          {/* <TextareaControl name="description" label="Description(max 100 characters)" onChange={changeDescription}/> */}
          
          <br />
          
          {/* <InputControl name="price" label="Price" itemType="number" onChange={changePrice}/> */}
          <FormControl>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input type="number" id="price" name="price" value={price} onChange={changePrice}/>
          </FormControl>
          
          <br />

          <Flex>
          <CheckboxSingleControl name="is_negotiable" onChange={changeIs_negotiable}>
            Price is negotiable
          </CheckboxSingleControl>
          
          <CheckboxSingleControl name="is_used" onChange={changeIs_used}>
            Product is used
          </CheckboxSingleControl>
          </Flex>

          <br />

          {/* take 5 images as input */}
          <label>Images (up to 5)</label>

          <br />
          <br />

          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={changeImages}
          />

          <br />
          <br />
          
          {is_used && (
            <FormControl>
              <FormLabel htmlFor="days_used">Days Used</FormLabel>
              <Input type="number" name="days_used" onChange={changeDays_used}/>
            </FormControl>
          )}

          <br />

          <CheckboxSingleControl name="is_phone_public" onChange={changeIs_phone_public}>
            Phone Number is public
          </CheckboxSingleControl>

          <br />
          
          <InputControl name="address" label="Address" onChange={changeAddress}/>

          <br />

          <ButtonGroup>
            <Button type="submit" onClick={onSubmit}>Submit</Button>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  )
}

export default PostAd
