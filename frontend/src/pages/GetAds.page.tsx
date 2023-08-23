import { useState } from "react";
import Layout from "../layout/Layout";
import { Grid, GridItem } from "@chakra-ui/layout";
import AdsList from "../components/Ads/AdsList";

const GetAds = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout title="Ads" loading={isLoading}>
      <Grid
        templateAreas={`"SearchBar_Section SearchBar_Section"
                        "filter_section ad_section"`}
        gridTemplateColumns={"1fr 700px"}
        gridTemplateRows={"80px 1fr"}
        gap={"5"}
        color={"teal.600"}
        mx={"70px"}
        my={"10px"}
      >
        <GridItem area={"filter_section"}>Filter</GridItem>
        <GridItem area={"ad_section"}>
          <AdsList />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default GetAds;
