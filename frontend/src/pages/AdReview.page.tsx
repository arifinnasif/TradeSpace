import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import ReviewList from "../components/Admin/ReviewList";

const AdReviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        <ReviewList />
      </Center>
    </AdminLayout>
  );
};

export default AdReviewPage;
