// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { adService, AdCardType } from "../../services/ad.service";
import { getAdReviews } from "../../services/admin.service";

interface AdCardType {
  id: string;
  title: string;
  category_name: string;
  price: string;
  is_used: boolean;
  is_negotiable: boolean;
  is_sell_ad: boolean;
  promotion_type: string;
}

function ReviewList() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewList, setReviewList] = useState<AdCardType[]>();
  async function fetchData() {
    setIsLoading(true);
    const reviews = await getAdReviews();
    setReviewList(reviews);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      <VStack spacing={"0"}>
        {reviewList?.map((p) => (
          <ReviewCard key={p.id} refreshAction={fetchData} {...p} />
        ))}
      </VStack>
    </Box>
  );
}

export default ReviewList;
