// This is a demo form for future use.
// used literally nowhere in the project.




// For backend integration:

// 1. Fetch categories from the database and put them categoris array.

// 2. Post new AD into the database. Go to the onAdd function

// 3. newAd object is the object that will contain all the data to push into the database.


import { Box, Flex, Stack } from '@chakra-ui/layout';

import { Button, 
         Center, 
         Checkbox, 
         FormControl, 
         FormErrorMessage, 
         FormHelperText, 
         FormLabel, 
         HStack, 
         Heading, 
         Input, 
         Select, 
         Textarea, 
         useColorModeValue 
       } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import Layout from '../layout/Layout';

import { useNavigate } from 'react-router-dom';


interface AdData {
  category: string,
  title: string,
  is_sell_ad: boolean,
  description: string,
  is_negotiable: boolean,
  is_used: boolean,
  days_used: number,
  is_phone_public: boolean,
  address: string,
  price: number,
  images: string[],
}

const onAdd = async (
  {
    category,
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
  }: AdData) => {
  const newAd:AdData = {
    category, 
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

// Insert the data into the database from here.
console.log(newAd)
}


// fetch categories from the database here
const categories = [
  "Vehicles",
  "Electronics",
  "Furniture",
  "Clothing",
]

const PostAd = () => {

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // declaration of states
  const [category, setCategory] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [is_sell_ad, setIs_sell_ad] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const [is_negotiable, setIs_negotiable] = useState<boolean>(false)
  const [is_used, setIs_used] = useState<boolean>(false)
  const [days_used, setDays_used] = useState<number>()
  const [is_phone_public, setIs_phone_public] = useState<boolean>(false)
  const [address, setAddress] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [images, setImages] = useState<string[]>([])

  // necessary for the days_used field.
  // let a user checks is_used and set days used 10.
  // but then then unchecks is_used. 
  // guess what happens to days_used? it stays 10.
  // so we need to reset it to undefined.
  useEffect(() => {
    if (is_used == false) {
      setDays_used(undefined)
    }
  }, [is_used])
    


  // declaration of error states
  const [categoryError, setCategoryError] = useState<boolean>(false)
  const [titleError, setTitleError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [days_usedError, setDays_usedError] = useState<boolean>(false)
  const [addressError, setAddressError] = useState<boolean>(false)
  const [priceError, setPriceError] = useState<boolean>(false)


  // declaration of touched states
  const [categoryTouched, setCategoryTouched] = useState<boolean>(false)
  const [titleTouched, setTitleTouched] = useState<boolean>(false)
  const [descriptionTouched, setDescriptionTouched] = useState<boolean>(false)
  const [days_usedTouched, setDays_usedTouched] = useState<boolean>(false)
  const [addressTouched, setAddressTouched] = useState<boolean>(false)
  const [priceTouched, setPriceTouched] = useState<boolean>(false)

  const handleCategoryTouched = () => {
    setCategoryTouched(true)
  }

  const handleTitleTouched = () => {
    setTitleTouched(true)
  }

  const handleDescriptionTouched = () => {
    setDescriptionTouched(true)
  }

  const handleDays_usedTouched = () => {
    setDays_usedTouched(true)
  }

  const handleAddressTouched = () => {
    setAddressTouched(true)
  }

  const handlePriceTouched = () => {
    setPriceTouched(true)
  }


  // definition of error checker hooks
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

  useEffect(() => {
    if (days_usedTouched && (is_used == true && (days_used == undefined || days_used < 0))) {
      setDays_usedError(true)
    } else {
      setDays_usedError(false)
    }
  }, [days_used, is_used, days_usedTouched])

  useEffect(() => {
    if (addressTouched && (address == undefined || address.length < 5 || address.length > 50)) {
      setAddressError(true)
    } else {
      setAddressError(false)
    }
  }, [address, addressTouched])

  useEffect(() => {
    if (priceTouched && (price == undefined || price < 0)) {
      setPriceError(true)
    } else {
      setPriceError(false)
    }
  }, [price, priceTouched])

  // change events definition
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleIs_sell_adChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIs_sell_ad(e.target.checked)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleIs_negotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIs_negotiable(e.target.checked)
  }

  const handleIs_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIs_used(e.target.checked)
  }

  const handleDays_usedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays_used(parseInt(e.target.value))
  }

  const handleIs_phone_publicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIs_phone_public(e.target.checked)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value))
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.value.split(","))
  }



  // validation function
  const validateUserInput = () => {
    if (categoryError ||
        titleError ||
        descriptionError ||
        days_usedError ||
        addressError ||
        priceError
       ) return false;

    return true;
  }

  const handleSubmit = (e : React.MouseEvent<HTMLButtonElement>) => { 
    
    e.preventDefault()
    
    if (validateUserInput()) {
      onAdd({
        category: category!,
        title: title!, 
        is_sell_ad: is_sell_ad, 
        description: description!, 
        is_negotiable: is_negotiable, 
        is_used: is_used, 
        days_used: days_used!, 
        is_phone_public: is_phone_public, 
        address: address!,
        price: price!,
        images: images
      })
      navigate("/");
    } else {
      alert("Please fill all the fields correctly")
    }
  }

  return (
    <>
      <Layout title="Hello" loading={isLoading}>
        <Flex
          minW={"85vw"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("teal.50", "gray.800")}
        >

          <Stack
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
            minW={"85vw"}
            minH={"100vh"}
          >
            <Center>
            <Heading fontSize={"4xl"}>Post an Ad</Heading>
            </Center>

            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={7}>
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

                <FormControl>
                  <Checkbox isChecked={is_sell_ad} onChange={handleIs_sell_adChange}>
                    Is a sell Ad
                  </Checkbox>
                </FormControl>
                  
                <FormControl isInvalid={descriptionError} onBlur={handleDescriptionTouched}>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder='Provide your products description' value={description} onChange={handleDescriptionChange} />
                  {descriptionError && <FormErrorMessage>
                                          Description should be at the range of 0-100 characters
                                      </FormErrorMessage>}

                </FormControl>

                <FormControl isRequired isInvalid={priceError} onBlur={handlePriceTouched}>
                  <FormLabel>Price</FormLabel>
                  <Input type="number" placeholder="Price" value={price} onChange={handlePriceChange} />
                  {priceError && <FormErrorMessage>Price should be a positive number</FormErrorMessage>}
                </FormControl>

                <FormControl>

                  <HStack spacing='200'>
                    <Checkbox isChecked={is_negotiable} onChange={handleIs_negotiableChange}>
                    Price is negotiable
                    </Checkbox>
                    <Checkbox isChecked={is_used} onChange={handleIs_usedChange}>
                    Product is used before
                    </Checkbox>
                  </HStack>
                  
                </FormControl>

                <FormControl>
                  <FormLabel>Upload images</FormLabel>
                  <input type = 'file' accept='image/*' multiple onChange={handleImagesChange} />
                  {/* why not <Input .../> here? */}
                  {/* Well it's just ugly for file imput. */}
                  {/* Such is frontend */}
                  <FormHelperText>Upload upto 5 images</FormHelperText>
                </FormControl>

                {
                  is_used && 
                  (
                  <FormControl isRequired isInvalid={days_usedError} onBlur={handleDays_usedTouched}>
                    <FormLabel>Days used</FormLabel>
                    <Input type="number" placeholder="Days used" value={days_used} onChange={handleDays_usedChange} />
                    {days_usedError && <FormErrorMessage>Days used should be a positive number</FormErrorMessage>}
                  </FormControl>
                  )
                }

                <FormControl>
                  <Checkbox isChecked={is_phone_public} onChange={handleIs_phone_publicChange}>
                    Make my phone number public for this Ad
                  </Checkbox>
                </FormControl>

                <FormControl isRequired isInvalid={addressError} onBlur={handleAddressTouched}>
                  <FormLabel>Address</FormLabel>
                  <Input type="text" placeholder="Address" value={address} onChange={handleAddressChange} />
                  {addressError && 
                  <FormErrorMessage>Address should be at the range of 5-50 characters</FormErrorMessage>}
                </FormControl>

                <Stack spacing={5}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Stack>
                
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Layout>
    </>
  )
}

export default PostAd;