import { Box, ButtonGroup, Flex } from "@chakra-ui/react";
import { Formik } from "formik";

import {
  CheckboxSingleControl,
  InputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl
} from "formik-chakra-ui";


import * as Yup from "yup";


const onSubmit = (values:any) => {
    console.log(JSON.stringify(values, null, 2));
};



const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
]



const phone = 12345678912;



const initialValues = {
    select_category: "",
    title: "",
    is_sell_ad: false,
    description: "",
    is_negotiable: false,
    is_used: false,
    phone: phone,
    days_used: "",
    is_phone_public: false,
    address: "",
    price: "",
};



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
});



const PostAd = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >

          <SelectControl
            name="select_category"
            selectProps={{ placeholder: "Select Category" }}
          >
          {categories.map((category, index) => (
          <option key={index} value={category}>
          {category}
          </option>
          ))}
          </SelectControl>

          <br />
          
          <InputControl name="tite" label="Title" />
          
          <br />
          
          <CheckboxSingleControl name="is_sell_ad">
            Is a sell Ad
          </CheckboxSingleControl>
          
          <br />
          
          <TextareaControl name="description" label="Description(max 100 characters)" />
          
          <br />
          
          <InputControl name="price" label="Price" />
          
          <br />
          
          <Flex>
          <CheckboxSingleControl name="is_negotiable">
            Price is negotiable
          </CheckboxSingleControl>
          
          <CheckboxSingleControl name="is_used">
            Product is used
          </CheckboxSingleControl>
          </Flex>
          
          <br />
          
          <InputControl name="days_used" label="Days Used(N/A for unused product)" isDisabled={!values.is_used}/>
          
          <br />
          
          <InputControl name="phone" label="Phone" />
          
          <br />
          
          <CheckboxSingleControl name="is_phone_public">
            Phone Number is public
          </CheckboxSingleControl>
          
          <br />
          
          <InputControl name="address" label="Address" />

          <br />
          
          <ButtonGroup>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        
        </Box>
      )}
    </Formik>
  );
};

export default PostAd;