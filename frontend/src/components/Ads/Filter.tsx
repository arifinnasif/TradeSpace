import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CategoryType, homeService } from "../../services/Home.service";
import SortFilter from "./SortFilter";
import CategoryFilter from "./CategoryFilter";
import PromoFilter from "./PromoFilter";

const Filter = () => {
  const navigate = useNavigate();
  // const [categoryList, setCategoryList] = useState<CategoryType[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPromos, setSelectedPromos] = useState<string[]>([]);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedAdType, setSelectedAdType] = useState("sell");
  const [isLoading, setIsLoading] = useState(false);
  const categoryList = React.useRef<string[]>([]);
  const [params, setParams] = useSearchParams();
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

  const handlePromoChange = (promo: string) => {
    if (selectedPromos.includes(promo)) {
      setSelectedPromos((prevPromos) => prevPromos.filter((p) => p !== promo));
    } else {
      setSelectedPromos((prevPromos) => [...prevPromos, promo]);
    }
  };

  const handleAdTypeChange = (adType: string) => {
    // console.log(adType);
    setSelectedAdType(adType);
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

    const selectedPromosQueryParam = selectedPromos
      .map((promo) => `promo_types[]=${encodeURIComponent(promo)}`)
      .join("&");

    const selectedAdTypeQueryParam = `ad_type=${encodeURIComponent(
      selectedAdType
    )}`;

    let queryParams =
      selectedCategoriesQueryParam +
      "&" +
      sortQueryParam +
      "&" +
      selectedPromosQueryParam +
      "&" +
      selectedAdTypeQueryParam;
    // const queryParams = selectedCategoriesQueryParam;

    // Construct the URL and navigate
    // console.log(queryParams);
    // navigate(`/ads?${queryParams}`);

    // if params has search_string, then append to the query params
    if (params.has("search_string")) {
      const search_string = params.get("search_string");
      // add search string to the front of the query params
      queryParams =
        `search_string=${encodeURIComponent(search_string)}&` + queryParams;
    }
    setParams(queryParams);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        {/* <Flex justify="space-between" align="center">
          <CategoryFilter handleCategoryChange={handleCategoryChange} />
          <SortFilter
            handleSortFieldChange={handleSortFieldChange}
            handleSortOrderChange={handleSortOrderChange}
          />
        </Flex> */}

        <Grid
          templateAreas={`"cat sort"
                          "promo ad_type"`}
          templateRows={`repeat(2, 1fr)`}
          templateColumns={`repeat(2, 1fr)`}
          gap={4}
        >
          <GridItem area="cat">
            <CategoryFilter handleCategoryChange={handleCategoryChange} />
          </GridItem>

          <GridItem area="sort">
            <SortFilter
              handleSortFieldChange={handleSortFieldChange}
              handleSortOrderChange={handleSortOrderChange}
            />
          </GridItem>

          <GridItem py={6} area="promo">
            <PromoFilter handlePromoChange={handlePromoChange} />
          </GridItem>

          <GridItem py={6} area="ad_type">
            <FormControl>
              <FormLabel>Filter by Ad Type</FormLabel>
              <RadioGroup defaultValue="sell" onChange={handleAdTypeChange}>
                <Stack gap={6} direction="row">
                  <Radio value="sell">Sell</Radio>
                  <Radio value="buy">Buy</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </GridItem>
        </Grid>

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
