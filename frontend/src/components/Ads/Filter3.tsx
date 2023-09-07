import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
} from "@chakra-ui/react";

const products = [
  {
    id: 1,
    name: "Product A",
    category: "Category 1",
    price: 100,
    days_used: 5,
  },
  {
    id: 2,
    name: "Product B",
    category: "Category 2",
    price: 50,
    days_used: 10,
  },
  // ... other products
];

const Filter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("price-asc");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen((prevState) => !prevState);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const clearSelectedCategories = () => {
    setSelectedCategories([]);
  };

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    )
    .sort((a, b) => {
      const [sortField, sortOrder] = sortOption.split("-");
      const aValue = sortField === "price" ? a.price : a.days_used;
      const bValue = sortField === "price" ? b.price : b.days_used;
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

  return (
    <ChakraProvider>
      <Box p={4}>
        <Flex justify="space-between" align="center">
          <VStack>
            <Stack>
              <FormControl>
                <FormLabel>Filter by Categories</FormLabel>
                <InputGroup>
                  <Input
                    value={selectedCategories.join(", ")}
                    placeholder="Select categories..."
                    onClick={toggleCategoryMenu}
                  />
                  {selectedCategories.length > 0 && (
                    <InputRightElement width="auto">
                      <Tag size="sm" colorScheme="teal">
                        {selectedCategories.map((category) => (
                          <Tag key={category} m="1" borderRadius="full">
                            <TagLabel>{category}</TagLabel>
                            <TagCloseButton
                              onClick={() => handleCategoryChange(category)}
                            />
                          </Tag>
                        ))}
                      </Tag>
                    </InputRightElement>
                  )}
                  <Menu
                    isOpen={isCategoryMenuOpen}
                    onClose={toggleCategoryMenu}
                  >
                    <MenuButton
                      as={Button}
                      rightIcon={<i className="fas fa-caret-down" />}
                    >
                      Select Categories
                    </MenuButton>
                    <MenuList>
                      {["Category 1", "Category 2", "Category 3"].map(
                        (category) => (
                          <MenuItem key={category}>
                            <Checkbox
                              isChecked={selectedCategories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                            >
                              {category}
                            </Checkbox>
                          </MenuItem>
                        )
                      )}
                    </MenuList>
                  </Menu>
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack>
              <FormControl>
                <FormLabel>Sort by</FormLabel>
                <RadioGroup onChange={setSortOption} value={sortOption}>
                  <Stack direction="row">
                    <Radio value="price-asc">Price Ascending</Radio>
                    <Radio value="price-desc">Price Descending</Radio>
                    <Radio value="days_used-asc">Days Used Ascending</Radio>
                    <Radio value="days_used-desc">Days Used Descending</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Stack>
          </VStack>
        </Flex>
        <Stack mt={4}>
          {filteredAndSortedProducts.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              shadow="md"
            >
              <strong>{product.name}</strong>
              <div>Category: {product.category}</div>
              <div>Price: {product.price}</div>
              <div>Days Used: {product.days_used}</div>
            </Box>
          ))}
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default Filter;
