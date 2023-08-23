import { useState } from "react";
import Layout from "../layout/Layout";
import CategoryList from "../components/Homepage/CategoryList";
import SearchComponent from "../components/Homepage/SearchBar";
import { Grid, GridItem } from "@chakra-ui/layout";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout title="Home" loading={isLoading}>
      <Grid
        templateAreas={`"SearchBar_section"
                        "CategoryList_section"`}
        gridTemplateRows={"80px 1fr"}
        gap={"5"}
        m={"10"}
      >
        <GridItem bgColor={""} area={"SearchBar_section"}>
          <SearchComponent />
        </GridItem>
        <GridItem bgColor={""} area={"CategoryList_section"}>
          <CategoryList />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default HomePage;
