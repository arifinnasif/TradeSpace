import {
  FormLabel,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  RadioGroup,
  Stack,
  Radio,
  Flex,
  Tag,
  TagLabel,
  FormControl,
  Checkbox,
  TagCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { homeService, CategoryType } from "../../services/Home.service";

interface SortFilterProps {
  handleCategoryChange: (category: string) => void;
}

const CategoryFilter: FunctionComponent<SortFilterProps> = ({
  handleCategoryChange,
}) => {
  const categoryList = React.useRef<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const callCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
    handleCategoryChange(category);
  };
  return (
    <FormControl>
      <FormLabel>Filter by Categories</FormLabel>
      <Menu>
        <MenuButton as={Button}>Select Categories</MenuButton>
        <MenuList>
          {categoryList.current.map((category) => (
            <MenuItem key={category}>
              <Checkbox
                isChecked={selectedCategories.includes(category)}
                onChange={() => callCategoryChange(category)}
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
              <TagCloseButton onClick={() => callCategoryChange(category)} />
            </Tag>
          ))}
        </Flex>
      )}
    </FormControl>
  );
};

export default CategoryFilter;
