"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Radio,
  RadioGroup,
  InputLeftAddon,
  InputGroup,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";



interface Step1Props {
  onNext: () => void;
  category?: string;
  title?: string;
  description?: string;
  setCategory: (name: string) => void;
  setTitle: (name: string) => void;
  setDescription: (phone: string) => void;
}


// temporary categories for now.
const categories = ["Electronics",
                    "Furniture",
                    "Clothing",
                    "Books",
];


const Step1: FunctionComponent<Step1Props> = ({
  onNext,
  category,
  title,
  description,
  setCategory,
  setTitle,
  setDescription,
}) => {

  // declaration of error states
  const [categoryError, setCategoryError] = useState<boolean>(false)


  // declaration of touched states
  const [categoryTouched, setCategoryTouched] = useState<boolean>(false)

  const handleCategoryTouched = () => {
    setCategoryTouched(true)
  }

  // change events definition
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }


  return (
    <>
      <FormControl isRequired isInvalid={categoryError} onBlur={handleCategoryTouched}>
        <FormLabel>Select Category</FormLabel>
          <Select placeholder="Category" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          {categoryError && <FormErrorMessage>Please select a category</FormErrorMessage>}
      </FormControl>
    </>
  );
}

export default Step1;