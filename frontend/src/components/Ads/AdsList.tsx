// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";
import AdCard from "./AdCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adService, AdCardType } from "../../services/ad.service";

function AdsList() {
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
    <Box>
      <VStack spacing={"2"}>
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
