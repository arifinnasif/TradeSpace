// import { Link } from "react-router-dom";

import { Box, VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdCardType } from "../../../services/ad.service";
import AdCard from "../../Ads/AdCard";
import { userService } from "../../../services/User.service";

function UserAdsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [adsList, setAdsList] = useState<AdCardType[]>();
  // const search_string_temp = search_string.get("search_string");
  // const filter = search_string.get("filter");
  // console.log(filter);
  // console.log(search_string_temp);
  // for (const [key, value] of params) {
  //   console.log(`${key}: ${value}`);
  // }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      //   const ads = await adService.getAds(params);
      const myAds = await userService.getUserOwnAds();
      setAdsList(myAds);
      console.log(adsList);
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

export default UserAdsList;
