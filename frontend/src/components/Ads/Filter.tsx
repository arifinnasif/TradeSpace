import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const handleSortFieldChange = (field: React.SetStateAction<string>) => {
    setSortField(field);
  };

  const handleSortOrderChange = (order: React.SetStateAction<string>) => {
    setSortOrder(order);
  };

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    )
    .sort((a, b) => {
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
              <MenuButton as={Button}>Select Categories</MenuButton>
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
              <MenuButton as={Button}>Sort Options</MenuButton>
              <MenuList>
                <MenuItem>
                  <FormLabel>Sort Field</FormLabel>
                  <RadioGroup
                    value={sortField}
                    onChange={handleSortFieldChange}
                  >
                    <Stack spacing={2}>
                      <Radio value="price">Price</Radio>
                      <Radio value="days_used">Used Days</Radio>
                    </Stack>
                  </RadioGroup>
                </MenuItem>
                <MenuItem>
                  <FormLabel>Sort Order</FormLabel>
                  <RadioGroup
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                  >
                    <Stack spacing={2}>
                      <Radio value="asc">Ascending</Radio>
                      <Radio value="desc">Descending</Radio>
                    </Stack>
                  </RadioGroup>
                </MenuItem>
              </MenuList>
            </Menu>
            <Flex mt={2}>
              {sortField && sortOrder && (
                <Tag size="md" variant="solid" colorScheme="blue">
                  <TagLabel>{sortField}</TagLabel>
                  <TagLabel>{sortOrder}</TagLabel>
                </Tag>
              )}
            </Flex>
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

export default App;
