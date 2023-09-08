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

interface PromoFilterProps {
  handlePromoChange: (promo: string) => void;
}

const PromoFilter: FunctionComponent<PromoFilterProps> = ({
  handlePromoChange,
}) => {
  const promoList = React.useRef<string[]>([]);
  const [selectedPromos, setselectedPromos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const promos = await homeService.getCategories();
      // console.log(promos);
      // assign only names to promoList
      promoList.current = promos;

      setIsLoading(false);
    }
    fetchData();
  }, []);

  const callPromoChange = (promo: string) => {
    if (selectedPromos.includes(promo)) {
      setselectedPromos((prevPromos) =>
        prevPromos.filter((cat) => cat !== promo)
      );
    } else {
      setselectedPromos((prevPromos) => [...prevPromos, promo]);
    }
    handlePromoChange(promo);
  };
  return (
    <FormControl>
      <FormLabel>Filter by Promotions</FormLabel>
      <Menu>
        <MenuButton as={Button}>Select Promotion</MenuButton>
        <MenuList>
          {promoList.current.map((promo) => (
            <MenuItem key={promo}>
              <Checkbox
                isChecked={selectedPromos.includes(promo)}
                onChange={() => callPromoChange(promo)}
              >
                {promo}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {selectedPromos.length > 0 && (
        <Flex mt={2} flexWrap="wrap">
          {selectedPromos.map((promo) => (
            <Tag key={promo} size="md" variant="solid" colorScheme="teal" m="1">
              <TagLabel>{promo}</TagLabel>
              <TagCloseButton onClick={() => callPromoChange(promo)} />
            </Tag>
          ))}
        </Flex>
      )}
    </FormControl>
  );
};

export default PromoFilter;
