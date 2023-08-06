// import { Link } from "react-router-dom";

import { Grid, GridItem, VStack } from "@chakra-ui/react";
import AdCard from "./AdCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adService, AdCardType } from "../../services/ad.service";

function GetAds() {
  const [isLoading, setIsLoading] = useState(false);
  const [adsList, setAdsList] = useState<AdCardType[]>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ads = await adService.getAds();
      setAdsList(ads);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <Grid
      templateAreas={`"filter_section ad_section"`}
      gridTemplateColumns={"1fr 700px"}
      color={"teal.600"}
      mx={"70px"}
      my={"10px"}
    >
      <GridItem area={"filter_section"}>Filter</GridItem>
      <GridItem area={"ad_section"}>
        <VStack spacing={"2"}>
          {adsList?.map((p) => (
            <Link to={`/ads/${p.id}`}>
              <AdCard key={p.id} {...p} />
            </Link>
          ))}
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default GetAds;
