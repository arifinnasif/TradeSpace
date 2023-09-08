import { Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const handlePageChange = (page: number) => {
    // console.log(currentPage);
    setCurrentPage(page);

    // console.log(params);
    // check if params has page
    // if yes, update page
    // if no, add page
    if (params.has("page")) {
      params.set("page", String(page));
    } else {
      params.append("page", String(page));
    }

    // navigate
    setParams(params);
  };

  return (
    <Flex
      w="full"
      //   bg={"gray.400"}
      _dark={{
        bg: "teal",
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        onChange={handlePageChange}
        defaultCurrent={1}
        total={50}
        paginationProps={{
          display: "flex",
        }}
        baseStyles={{
          bg: "teal.200",
        }}
        activeStyles={{
          bg: "teal.600",
        }}
        hoverStyles={{
          bg: "gray.300",
        }}
      />
    </Flex>
  );
};

export default PaginationComponent;
