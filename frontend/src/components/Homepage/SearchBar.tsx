import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, Input, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface SearchComponentProps {
  onEnterKey: (search_term: string) => void;
}

const SearchComponent: FunctionComponent<SearchComponentProps> = ({
  onEnterKey,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === "Enter") {
      // Navigate to the specified link when "Enter" key is pressed
      // navigate(`/ads?search_string=${searchTerm}`);

      // const params = {
      //   search_string: searchTerm,
      // };
      // navigate({
      //   pathname: "/ads",
      //   search: `?${createSearchParams(params)}`,
      // });
      onEnterKey(searchTerm);
    }
  };

  const handleButtonClick = () => {
    // Navigate to the specified link when the button is clicked
    navigate(`/ads?search_string=${searchTerm}`);
  };

  return (
    <InputGroup p={"3"}>
      <Input
        type="text"
        placeholder="What are you looking for?"
        _placeholder={{ color: "teal" }}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
        focusBorderColor="teal.400"
        size={"lg"}
        borderColor={"teal"}
      />

      <Button
        type="submit"
        colorScheme="teal"
        variant="outline"
        ml="2"
        size="lg"
        leftIcon={<SearchIcon />}
        onClick={handleButtonClick}
      />
    </InputGroup>
  );
};

export default SearchComponent;
