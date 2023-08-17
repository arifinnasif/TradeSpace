"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";



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
  const [titleError, setTitleError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)




  // declaration of touched states and action
  const [categoryTouched, setCategoryTouched] = useState<boolean>(false)
  const handleCategoryTouched = () => {
    setCategoryTouched(true)
  }

  const [titleTouched, setTitleTouched] = useState<boolean>(false)
  const handleTitleTouched = () => {
    setTitleTouched(true)
  }

  const [descriptionTouched, setDescriptionTouched] = useState<boolean>(false)
  const handleDescriptionTouched = () => {
    setDescriptionTouched(true)
  }




  
  // change events definition
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }



  // error checking hooks for constant supervision
  useEffect(() => {
    if (categoryTouched && (category == undefined || category == "")) {
      setCategoryError(true)
    } else {
      setCategoryError(false)
    }
  }, [category, categoryTouched])


  useEffect(() => {
    if (titleTouched && (title == undefined || title.length < 5 || title.length > 50)) {
      setTitleError(true)
    } else {
      setTitleError(false)
    }
  }, [title, titleTouched])


  useEffect(() => {
    if (descriptionTouched && (description != undefined && description.length > 100)) {
      setDescriptionError(true)
    } else {
      setDescriptionError(false)
    }
  }, [description, descriptionTouched])



  // validation function
  const isUserInputValid = () => {
    if (categoryError || category == undefined || category == "" ||
        titleError || title == undefined || title.length < 5 || title.length > 50 ||
        descriptionError || (description != undefined && description.length > 100)
       ) return false;

    return true;
  }


  const toast = useToast();

  const handleNextRequest = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isUserInputValid()){
      console.log(category)
      console.log(title)
      console.log(description)
      onNext();
    }
    else {
      console.log("Invalid Inputs")
      toast({
        title: "Invalid Inputs",
        description: "Please check your inputs and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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


      <FormControl isRequired isInvalid={titleError} onBlur={handleTitleTouched}>
        <FormLabel>Title</FormLabel>
        <Input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
        {titleError && <FormErrorMessage>Title should be at the range of 5-50 characters</FormErrorMessage>}
      </FormControl>


      <FormControl isInvalid={descriptionError} onBlur={handleDescriptionTouched}>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder='Provide your products description' value={description} onChange={handleDescriptionChange} />
        {descriptionError && <FormErrorMessage>
                                Description should be at the range of 0-100 characters
                            </FormErrorMessage>}

      </FormControl>

      <Button
        // isDisabled={!isUserInputValid()}
        onClick={handleNextRequest}
        bg={"teal.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
      >
        Next
      </Button>
    </>
  );
}

export default Step1;
