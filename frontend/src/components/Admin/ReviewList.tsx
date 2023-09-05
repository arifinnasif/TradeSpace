// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { FunctionComponent } from "react";
import { ReviewCardType } from "../../services/admin.service";

interface ReviewListProps {
  reviewList?: ReviewCardType[];
}

const ReviewList: FunctionComponent<ReviewListProps> = ({ reviewList }) => {
  return (
    <Box>
      <VStack spacing={"0"}>
        {reviewList?.map((p) => (
          <ReviewCard key={p.id} {...p} />
        ))}
      </VStack>
    </Box>
  );
};

export default ReviewList;
