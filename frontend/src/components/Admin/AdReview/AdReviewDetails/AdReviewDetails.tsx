import { FunctionComponent, useEffect, useState } from "react";
import {
  ReviewDetailsType,
  getAnAdReview,
} from "../../../../services/admin.service";
import { Box, Center, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import * as _ from "lodash";
import TopCard from "../../../Ads/AdDetails/TopCard";
import InfoCard from "../../../Ads/AdDetails/InfoCard";
import { FaThList, FaTag, FaUserTag, FaLeaf } from "react-icons/fa";

import { BiSolidBandAid } from "react-icons/bi";
import { useParams } from "react-router-dom";

const AdReviewDetails = () => {
  const [ad, setAd] = useState<ReviewDetailsType>();
  const { ad_id } = useParams<{ ad_id: string }>();
  useEffect(() => {
    console.log("from review details ", ad_id);
    async function fetchData() {
      console.log("fetching data");

      try {
        const response = await getAnAdReview(+ad_id!);
        setAd(response);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    }

    fetchData();
  }, []);

  const stringifyUsageTime = (year: number, month: number, day: number) => {
    let str = "";

    if (year === 1) {
      str += year + " year ";
    } else if (year > 1) {
      str += year + " years ";
    }

    if (month === 1) {
      str += month + " month ";
    } else if (month > 1) {
      str += month + " months ";
    }

    if (day === 1) {
      str += day + " day ";
    } else if (day > 1) {
      str += day + " days ";
    }

    return str;
  };

  if (!ad) return <></>;

  return (
    <Box padding={6}>
      <Heading size="lg" textAlign="center">
        {ad!.is_sell_ad ? "For Sell" : "Looking to Buy"}
      </Heading>
      <Center>
        <TopCard
          title={ad!.title}
          price={ad!.price}
          op_username={ad!.op_username}
          op_fullname={ad!.op_fullname}
          created_at={new Date(ad!.created_at).toDateString()}
          address={ad!.address!.description}
          op_email={ad!.op_email}
          op_phone={ad!.phone}
          image={ad!.image1}
        />
      </Center>
      <Spacer height={16} />

      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <InfoCard icon={FaThList} title={_.startCase(ad!.category_name)} />
        {/* <Spacer /> */}
        {ad!.is_negotiable ? (
          <InfoCard icon={FaUserTag} title="Negotiable" />
        ) : (
          <InfoCard icon={FaTag} title="Fixed Price" />
        )}
        {/* <Spacer /> */}
        {ad!.is_used ? (
          <InfoCard
            icon={BiSolidBandAid}
            title="Used"
            subtitle={stringifyUsageTime(
              ad!.days_used!.years,
              ad!.days_used!.months,
              ad!.days_used!.days
            )}
          />
        ) : (
          <InfoCard icon={FaLeaf} title="New" />
        )}
      </Grid>
      <Spacer height={16} />
    </Box>
  );
};

export default AdReviewDetails;
