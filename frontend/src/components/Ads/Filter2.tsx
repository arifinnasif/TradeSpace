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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");

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

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Flex justify="space-between" align="center">
          <FormControl>
            <FormLabel>Filter by Categories</FormLabel>
            <Stack direction="row">
              <Checkbox
                isChecked={selectedCategories.length === 0}
                onChange={() => setSelectedCategories([])}
              >
                All Categories
              </Checkbox>
              {["Category 1", "Category 2", "Category 3"].map((category) => (
                <Checkbox
                  key={category}
                  isChecked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                >
                  {category}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
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
