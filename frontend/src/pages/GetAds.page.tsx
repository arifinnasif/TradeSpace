import { useState } from "react";
import Layout from "../layout/Layout";
import { Grid, GridItem } from "@chakra-ui/layout";
import AdsList from "../components/Ads/AdsList";
import SearchComponent from "../components/Homepage/SearchBar";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const GetAds = () => {
  const [params, setParams] = useSearchParams();
  const search_string_temp = String(params.get("search_string"));
  console.log(search_string_temp);
  const [isLoading, setIsLoading] = useState(false);

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
        <GridItem area={"SearchBar_Section"}>
          <SearchComponent onEnterKey={handleSearchSubmit} />
        </GridItem>
        <GridItem area={"filter_section"}>Filter</GridItem>
        <GridItem area={"ad_section"}>
          <AdsList />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default GetAds;
