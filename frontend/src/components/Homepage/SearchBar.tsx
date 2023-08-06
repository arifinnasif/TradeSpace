import React, { ChangeEvent, useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        focusBorderColor="teal.400"
      />
      <Link to={`/ads/?search_string=${searchTerm}`}>
        <Button
          type="submit"
          colorScheme="teal"
          variant="outline"
          ml="2"
          size="md"
          leftIcon={<SearchIcon />}
        />
      </Link>
    </InputGroup>
  );
};

export default SearchComponent;
