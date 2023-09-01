import { useState } from "react";
import Layout from "../layout/Layout";
import CategoryList from "../components/Homepage/CategoryList";
import SearchComponent from "../components/Homepage/SearchBar";
import { Grid, GridItem } from "@chakra-ui/layout";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearchSubmit = (search_term: string) => {
    const search_param = {
      search_string: search_term,
    };
    // console.log(search_param);
    setParams(search_param);
    navigate({
      pathname: "/ads",
      search: `?${createSearchParams(search_param)}`,
    });

    navigate(0);
  };
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
          <SearchComponent onEnterKey={handleSearchSubmit} />
        </GridItem>
        <GridItem bgColor={""} area={"CategoryList_section"}>
          <CategoryList />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default HomePage;
