import React, { useEffect, useState } from "react";
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
import { CategoryType, homeService } from "../../services/Home.service";
import SortFilter from "./SortFilter";

const Filter = () => {
  const navigate = useNavigate();
  // const [categoryList, setCategoryList] = useState<CategoryType[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);
  const categoryList = React.useRef<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cats = await homeService.getCategories();
      // console.log(cats);
      // assign only names to categoryList
      categoryList.current = cats.map((cat: CategoryType) => cat.name);

      setIsLoading(false);
    }
    fetchData();
  }, []);

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
    // const queryParams = selectedCategoriesQueryParam;

    // Construct the URL and navigate
    // console.log(queryParams);
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
                {categoryList.current.map((category) => (
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
          <SortFilter
            handleSortFieldChange={handleSortFieldChange}
            handleSortOrderChange={handleSortOrderChange}
          />
        </Flex>

        <Button
          onClick={handleFilterClick}
          w="50%" // Set the width to 100% to make it a block button
          display="block" // Set the display to "block" to make it a block button
          mx="" // Center the button
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
