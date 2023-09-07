import { Box, VStack } from "@chakra-ui/react";

import Actions from "./Actions";
import Data from "./Data";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import { userProfileType, userService } from "../../../services/User.service";

function SummaryBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [userinfo, setUserInfo] = useState<userProfileType>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userinfo = await userService.getUserInfo();
      setUserInfo(userinfo);
      // console.log(userinfo);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <Box
      as="aside"
      flex={1}
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="brand.light"
      //   style={{ transform: "translateY(-100px)" }}
    >
      <Profile name={userinfo?.name} profile_pic={userinfo?.profile_pic} />
      <Data
        posted_ads_count={userinfo?.posted_ads_count}
        pending_ads_count={userinfo?.pending_ads_count}
        active_ads_count={userinfo?.active_ads_count}
        declined_ads_count={userinfo?.declined_ads_count}
      />
      <Actions />
    </Box>
  );
}

export default SummaryBar;
