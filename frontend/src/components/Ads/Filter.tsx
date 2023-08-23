import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Tag,
  TagLabel,
  TagCloseButton,
  RadioGroup,
  Radio,
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

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
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
          <FormControl>
            <FormLabel>Filter by Categories</FormLabel>
            <Menu>
              <MenuButton as={Tag} cursor="pointer">
                Select Categories
              </MenuButton>
              <MenuList>
                {["Category 1", "Category 2", "Category 3"].map((category) => (
                  <MenuItem key={category}>
                    <Checkbox
                      isChecked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {selectedCategories.length > 0 && (
              <Flex mt={2} flexWrap="wrap">
                {selectedCategories.map((category) => (
                  <Tag
                    key={category}
                    size="md"
                    variant="solid"
                    colorScheme="teal"
                    m="1"
                  >
                    <TagLabel>{category}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleCategoryChange(category)}
                    />
                  </Tag>
                ))}
              </Flex>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Sort by</FormLabel>
            <Menu>
              <MenuButton as={Tag} cursor="pointer">
                Sort by:{" "}
                {sortOption === "price-asc"
                  ? "Price Ascending"
                  : "Price Descending"}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSortOption("price-asc")}>
                  Price Ascending
                </MenuItem>
                <MenuItem onClick={() => setSortOption("price-desc")}>
                  Price Descending
                </MenuItem>
                <MenuItem onClick={() => setSortOption("days_used-asc")}>
                  Days Used Ascending
                </MenuItem>
                <MenuItem onClick={() => setSortOption("days_used-desc")}>
                  Days Used Descending
                </MenuItem>
              </MenuList>
            </Menu>
          </FormControl>
        </Flex>
        <Box mt={4}>
          {filteredAndSortedProducts.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              shadow="md"
              my={2}
            >
              <strong>{product.name}</strong>
              <div>Category: {product.category}</div>
              <div>Price: {product.price}</div>
              <div>Days Used: {product.days_used}</div>
            </Box>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
