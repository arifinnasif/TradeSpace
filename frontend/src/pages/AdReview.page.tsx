import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Center, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import ReviewList from "../components/Admin/ReviewList";
import { ReviewCardType, getAdReviews } from "../services/admin.service";
import Pagination from "../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const AdReviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewList, setReviewList] = useState<ReviewCardType[]>();
  const [maxPage, setMaxPage] = useState(1);
  async function fetchData(page?: number) {
    console.log("fetching data", page);
    setIsLoading(true);

    try {
      const response = await getAdReviews(page);
      const reviews = response.review_list.map((r) => {
        r.refreshAction = () => fetchData(page);
        return r;
      });
      setMaxPage(response.total_pages);
      setReviewList(reviews);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        fetchData(page);
      }, 5000);
    }
  }

  const [searchParams, setsearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setsearchParams({ page: "1" });
    }
  });

  useEffect(() => {
    fetchData(Number(searchParams.get("page")));
  }, [searchParams]);

  const textColor = useColorModeValue("gray.600", "gray.300");

  const setCurrentPage = (page: number) => {
    if (page > maxPage) {
      setsearchParams({ page: maxPage.toString() });
      return;
    }
    setsearchParams({ page: page.toString() });
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
        {maxPage == 0 ? (
          <Text fontSize={"3xl"} as={"b"} margin={200} color={textColor}>
            Take a break, Young Puppet Master. There are no ads to review 😪
          </Text>
        ) : (
          <VStack>
            <ReviewList reviewList={reviewList} />
            <Pagination
              currentPage={Number(searchParams.get("page"))}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
              maxPageToShow={5}
            />
          </VStack>
        )}
      </Center>
    </AdminLayout>
  );
};

export default AdReviewPage;
