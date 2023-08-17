import { useState } from "react";
import Layout from "../layout/Layout";
import { Grid, GridItem } from "@chakra-ui/react";

const AdReviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout title="Ad Reviews" loading={isLoading}>
      <Grid
        templateAreas={`"filter_section ad_section"`}
        gridTemplateColumns={"1fr 700px"}
        color={"teal.600"}
        mx={"70px"}
        my={"10px"}
      >
        <GridItem area={"filter_section"}></GridItem>
        <GridItem area={"ad_section"}></GridItem>
      </Grid>
    </Layout>
  );
};

export default AdReviewPage;
