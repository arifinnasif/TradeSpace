import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import ReviewList from "../components/Admin/ReviewList";
import { ReviewCardType, getAdReviews } from "../services/admin.service";

const AdReviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewList, setReviewList] = useState<ReviewCardType[]>();
  async function fetchData() {
    console.log("fetching data");
    setIsLoading(true);
    let reviews = await getAdReviews();
    reviews = reviews.map((r) => {
      r.refreshAction = fetchData;
      return r;
    });
    setReviewList(reviews);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

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
        <ReviewList reviewList={reviewList} />
      </Center>
    </AdminLayout>
  );
};

export default AdReviewPage;
