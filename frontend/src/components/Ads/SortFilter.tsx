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
} from "@chakra-ui/react";

const sortFilter = (props: any) => {
  <FormControl>
    <FormLabel>Sort by</FormLabel>
    <Menu>
      <MenuButton as={Button}>Sort Options</MenuButton>
      <MenuList>
        <MenuItem>
          <FormLabel>Sort Field</FormLabel>
          <RadioGroup value={sortField} onChange={handleSortFieldChange}>
            <Stack spacing={2}>
              <Radio value="price">Price</Radio>
              <Radio value="days_used">Days Used</Radio>
            </Stack>
          </RadioGroup>
        </MenuItem>
        <MenuItem>
          <FormLabel>Sort Order</FormLabel>
          <RadioGroup value={sortOrder} onChange={handleSortOrderChange}>
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
        <>
          <Tag m="1" size="md" variant="solid" colorScheme="blue">
            {/* if sortField==price, tagLabel is Price */}
            <TagLabel>{sortField === "price" ? "Price" : "Days Used"}</TagLabel>
          </Tag>
          <Tag m="1" size="md" variant="solid" colorScheme="blue">
            <TagLabel>
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </TagLabel>
          </Tag>
        </>
      )}
    </Flex>
  </FormControl>;
};
