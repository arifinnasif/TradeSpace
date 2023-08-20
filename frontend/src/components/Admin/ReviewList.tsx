// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import { ReviewCardType, getAdReviews } from "../../services/admin.service";

function ReviewList() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewList, setReviewList] = useState<ReviewCardType[]>();
  async function fetchData() {
    console.log("fetching data");
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
        {reviewList?.map((p) => {
          p.refreshAction = fetchData;
          return <ReviewCard key={p.id} {...p} />;
        })}
      </VStack>
    </Box>
  );
}

export default ReviewList;
