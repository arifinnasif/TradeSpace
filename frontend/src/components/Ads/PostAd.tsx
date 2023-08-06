//@ts-nocheck
//@ts-ignore

import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { Formik, useFormik } from "formik";

import {
  CheckboxSingleControl,
  InputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";

import React, {useState, useEffect} from 'react'

import * as Yup from "yup";

const onAdd = ({category, 
                title, 
                is_sell_ad, 
                description, 
                is_negotiable, 
                is_used, 
                days_used, 
                phone, 
                is_phone_public, 
                address, 
                price, 
                images}) => {
  const newAd = {category, title, is_sell_ad, description, is_negotiable, is_used, days_used, phone, is_phone_public, address, price, images}
  console.log(newAd)
}


const initialValues = {
  select_category: "",
  title: "",
  is_sell_ad: false,
  description: "",
  is_negotiable: false,
  is_used: false,
  phone: '12345678912',
  days_used: "",
  is_phone_public: false,
  address: "",
  price: "",
  images: [],
};

const categories = [
  "Electronics",
  "Furniture",
  "Clothing",
]

const validationSchema = Yup.object({
title: Yup.string().required().min(5).max(50),
is_sell_ad: Yup.boolean(),
description: Yup.string().max(100),
price: Yup.number().required().min(0),
is_negotiable: Yup.boolean(),
is_used: Yup.boolean(),
days_used: Yup.number().min(0),
phone: Yup.number().required().min(10000000000).max(99999999999),
is_phone_public: Yup.boolean(),
address: Yup.string().required().min(5).max(50),
images: Yup.array().max(5),
});

const PostAd = () => {
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [is_sell_ad, setIs_sell_ad] = useState(false)
  const [description, setDescription] = useState('')
  const [is_negotiable, setIs_negotiable] = useState(false)
  const [is_used, setIs_used] = useState(false)
  const [days_used, setDays_used] = useState('')
  const [phone, setPhone] = useState(12345678912)
  const [is_phone_public, setIs_phone_public] = useState(false)
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])


  const changeCategory = (e) => {
    setCategory(e.target.value)
  }
  const changeTitle = (e) => {
    setTitle(e.target.value)
  }
  const changeIs_sell_ad = (e) => {
    setIs_sell_ad(!is_sell_ad)
  }
  const changeDescription = (e) => {
    setDescription(e.target.value)
  }
  const changeIs_negotiable = (e) => {
    setIs_negotiable(!is_negotiable)
  }
  const changeIs_used = (e) => {
    setIs_used(!is_used)
  }
  const changeDays_used = (e) => {
    setDays_used(e.target.value)
  }
  const changePhone = (e) => {
    setPhone(e.target.value)
  }
  const changeIs_phone_public = (e) => {
    setIs_phone_public(!is_phone_public)
  }
  const changeAddress = (e) => {
    setAddress(e.target.value)
  }
  const changePrice = (e) => {
    setPrice(e.target.value)
  }
  const changeImages = (e) => {
    setImages(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // if (!text) {
    //   alert('Please add a task')
    //   return
    // }
    onAdd({category, 
           title, 
           is_sell_ad, 
           description, 
           is_negotiable, 
           is_used, 
           days_used, 
           phone, 
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
          <SelectControl
            name="category"
            selectProps={{ placeholder: "Select Category" }}
            onChange={changeCategory}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </SelectControl>
          <br />
          
          <InputControl name="title" label="Title" onChange={changeTitle} />
          
          <br />
          <CheckboxSingleControl name="is_sell_ad" onChange={changeIs_sell_ad}>
            Is a sell Ad
          </CheckboxSingleControl>

          <br />

          <TextareaControl name="description" label="Description(max 100 characters)" onChange={changeDescription}/>
          
          <br />
          
          <InputControl name="price" label="Price" onChange={changePrice}/>
          
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
          
          <InputControl name="days_used" label="Days Used(N/A for unused product)" isDisabled={!is_used} onChange={changeDays_used}/>
    
          
          <br />
          
          <InputControl name="phone" label="Phone" onChange={changePhone}/>
          
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
