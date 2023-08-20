import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Button,
  Center,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ReviewList from "../components/Admin/ReviewList";
import { ReviewCardType, getAdReviews } from "../services/admin.service";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const AdReviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewList, setReviewList] = useState<ReviewCardType[]>();
  async function fetchData() {
    console.log("fetching data");
    setIsLoading(true);

    try {
      let reviews = await getAdReviews();
      reviews = reviews.map((r) => {
        r.refreshAction = fetchData;
        return r;
      });
      setReviewList(reviews);
      setIsLoading(false);
    } catch (error) {
      setTimeout(() => {
        fetchData();
      }, 5000);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const textColor = useColorModeValue("gray.600", "gray.300");

  const [currentPage, setCurrentPage] = useState(1);
  const maxPageToShow = 5;
  let maxPage = 10;

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
    <AdminLayout title="Ad Reviews" loading={isLoading}>
      {/* <Grid
        templateAreas={`"filter_section review_section"`}
        gridTemplateColumns={"1fr 700px"}
        color={"teal.600"}
        mx={"70px"}
        my={"10px"}
      >
        <GridItem area={"filter_section"}></GridItem>
        <GridItem area={"review_section"}>
          <ReviewList />
        </GridItem>
      </Grid> */}
      <Center>
        {reviewList !== undefined && reviewList.length > 0 ? (
          <ReviewList reviewList={reviewList} />
        ) : (
          <Text fontSize={"3xl"} as={"b"} margin={200} color={textColor}>
            Take a break, Young Puppet Master. There are no ads to review 😪
          </Text>
        )}
      </Center>
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
    </AdminLayout>
  );
};

export default AdReviewPage;
