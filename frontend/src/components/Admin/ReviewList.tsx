// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adService, AdCardType } from "../../services/ad.service";

function ReviewList() {
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
      <VStack spacing={"0"}>
        {adsList?.map((p) => (
          <ReviewCard key={p.id} {...p} />
        ))}
      </VStack>
    </Box>
  );
}

export default ReviewList;
