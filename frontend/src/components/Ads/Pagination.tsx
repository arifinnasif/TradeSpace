import { Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

const PaginationComponent = () => {
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
