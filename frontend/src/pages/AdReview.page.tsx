import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Center, Text, useColorModeValue } from "@chakra-ui/react";
import ReviewList from "../components/Admin/ReviewList";
import { ReviewCardType, getAdReviews } from "../services/admin.service";
import Pagination from "../components/Pagination/Pagination";

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

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
        maxPageToShow={maxPageToShow}
      />
    </AdminLayout>
  );
};

export default AdReviewPage;
