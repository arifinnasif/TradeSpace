// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";
import AdCard from "./AdCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adService, AdCardType } from "../../services/ad.service";
import { useSearchParams } from "react-router-dom";

function AdsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [adsList, setAdsList] = useState<AdCardType[]>();
  const [search_string, setSearch_string] = useSearchParams();
  const search_string_temp = search_string.get("search_string");
  // const filter = search_string.get("filter");
  // console.log(filter);
  // console.log(search_string_temp);

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
    <Box>
      <VStack spacing={"0"}>
        {adsList?.map((p) => (
          <Link to={`/ads/${p.id}`}>
            <AdCard key={p.id} {...p} />
          </Link>
        ))}
      </VStack>
    </Box>
  );
}

export default AdsList;
