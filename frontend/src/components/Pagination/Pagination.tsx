import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, HStack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (arg_page: number) => void;
  maxPage: number;
  maxPageToShow: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  maxPage,
  maxPageToShow,
}) => {
  const startPageToShow = () => {
    if (currentPage <= Math.ceil(maxPageToShow / 2)) {
      return 1;
    }
    if (currentPage + Math.floor(maxPageToShow / 2) >= maxPage) {
      return maxPage - maxPageToShow + 1;
    }
    return currentPage - Math.floor(maxPageToShow / 2);
  };

  const endPageToShow = () => {
    return Math.min(startPageToShow() + maxPageToShow - 1, maxPage);
  };

  const currentPageIndex = () => {
    return currentPage - startPageToShow();
  };

  const isPrevEnabled = () => {
    if (currentPage <= 1) {
      return false;
    } else {
      return true;
    }
  };

  const isNextEnabled = () => {
    if (currentPage >= maxPage) {
      return false;
    } else {
      return true;
    }
  };

  const prevButtonAction = () => {
    if (!isPrevEnabled()) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const nextButtonAction = () => {
    if (!isNextEnabled()) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const pageButtonAction = (arg_page: number) => {
    setCurrentPage(arg_page);
  };

  const pageButtons = () => {
    const buttons = [];
    for (let i = startPageToShow(); i <= endPageToShow(); i++) {
      buttons.push(
        <Tab key={i} onClick={() => pageButtonAction(i)}>
          {i}
        </Tab>
      );
    }
    return buttons;
  };
  return (
    <HStack>
      <Button isDisabled={!isPrevEnabled()} onClick={prevButtonAction}>
        <ArrowBackIcon />
      </Button>
      <Tabs
        variant="soft-rounded"
        colorScheme="teal"
        defaultIndex={0}
        index={currentPageIndex()}
      >
        <TabList>{pageButtons()}</TabList>
      </Tabs>
      <Button isDisabled={!isNextEnabled()} onClick={nextButtonAction}>
        <ArrowForwardIcon />
      </Button>
    </HStack>
  );
};

export default Pagination;
