import { useEffect, useState } from "react";
import {
  Center,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import ReviewList from "./ReviewList";
import { ReviewCardType, getAdReviews } from "../../../services/admin.service";
import Pagination from "../../Pagination/Pagination";
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
      const reviews = response.review_list.map((r: any) => {
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
    <Center>
      {maxPage == 0 ? (
        <Text fontSize={"3xl"} as={"b"} margin={200} color={textColor}>
          Take a break, Young Puppet Master. There are no ads to review 😪
        </Text>
      ) : (
        <VStack minH={400}>
          <ReviewList reviewList={reviewList} />
          <Spacer height={"4"} />
          <Pagination
            currentPage={Number(searchParams.get("page"))}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            maxPageToShow={5}
          />
        </VStack>
      )}
    </Center>
  );
};

export default AdReviewPage;
