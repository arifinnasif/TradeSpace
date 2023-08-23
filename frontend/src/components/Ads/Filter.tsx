import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Filter = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortField, setSortField] = useState("Price");
  const [sortOrder, setSortOrder] = useState("Ascending");

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

  const filteredAndSortedProducts = products;
  // .filter(
  //   (product) =>
  //     selectedCategories.length === 0 ||
  //     selectedCategories.includes(product.category)
  // )
  // .sort((a, b) => {
  //   const aValue = sortField === "Price" ? a.price : a.days_used;
  //   const bValue = sortField === "Price" ? b.price : b.days_used;
  //   return sortOrder === "Ascending" ? aValue - bValue : bValue - aValue;
  // });

  const handleFilterClick = () => {
    const selectedCategoriesQueryParam = selectedCategories
      .map((cat) => `cat[]=${encodeURIComponent(cat)}`)
      .join("&");
    const sortQueryParam = `sort=${encodeURIComponent(
      sortField
    )},${encodeURIComponent(sortOrder)}`;

    const queryParams = selectedCategoriesQueryParam + "&" + sortQueryParam;

    // Construct the URL and navigate
    navigate(`/ads?${queryParams}`);
  };

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
                      <Radio value="Price">Price</Radio>
                      <Radio value="Days Used">Used Days</Radio>
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
                      <Radio value="Ascending">Ascending</Radio>
                      <Radio value="Descending">Descending</Radio>
                    </Stack>
                  </RadioGroup>
                </MenuItem>
              </MenuList>
            </Menu>
            <Flex mt={2}>
              {sortField && sortOrder && (
                <>
                  <Tag m="1" size="md" variant="solid" colorScheme="blue">
                    <TagLabel>{sortField}</TagLabel>
                  </Tag>
                  <Tag m="1" size="md" variant="solid" colorScheme="blue">
                    <TagLabel>{sortOrder}</TagLabel>
                  </Tag>
                </>
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
        <Button
          onClick={handleFilterClick}
          w="70%" // Set the width to 100% to make it a block button
          display="block" // Set the display to "block" to make it a block button
          mx="auto" // Center the button
          mt={4} // Add some margin on top
          colorScheme="teal" // Use the teal color scheme
        >
          Filter
        </Button>
      </Box>

      {/* Add the filter button */}
    </ChakraProvider>
  );
};

export default Filter;
