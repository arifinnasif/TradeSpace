import React, { ChangeEvent, useState } from "react";
import { Button, Input, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <InputGroup p={"3"}>
      <Input
        type="text"
        placeholder="What are you looking for?"
        _placeholder={{ color: "teal" }}
        onChange={handleInputChange}
        focusBorderColor="teal.400"
        size={"lg"}
        borderColor={"teal"}
      />
      <Link to={`/ads/?search_string=${searchTerm}`}>
        <Button
          type="submit"
          colorScheme="teal"
          variant="outline"
          ml="2"
          size="lg"
          leftIcon={<SearchIcon />}
        />
      </Link>
    </InputGroup>
  );
};

export default SearchComponent;
