import { FunctionComponent } from "react";
import { AdDetailsType } from "../../../services/ad.service";
import { Center, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import * as _ from "lodash";
import TopCard from "./TopCard";
import InfoCard from "./InfoCard";
import DescriptionCard from "./DescriptionCard";
import {
  FaThList,
  FaTag,
  FaUserTag,
  FaLeaf,
  FaShoppingCart,
} from "react-icons/fa";

import { BiSolidBandAid } from "react-icons/bi";

const AdDetails: FunctionComponent<AdDetailsType> = (ad) => {
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

  return (
    <>
      <Heading size="lg" textAlign="center">
        {ad.is_sell_ad ? "For Sell" : "Looking to Buy"}
      </Heading>
      <Center>
        <TopCard
          title={ad.title}
          price={ad.price}
          op_username={ad.op_username}
          op_fullname={ad.op_fullname}
          created_at={new Date(ad.created_at).toDateString()}
          address={ad.address!.description}
          op_email={ad.op_email}
          op_phone={ad.phone}
          image={ad.image1}
        />
      </Center>
      <Spacer height={16} />

      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <InfoCard icon={FaThList} title={_.startCase(ad.category_name)} />
        {/* <Spacer /> */}
        {ad.is_negotiable ? (
          <InfoCard icon={FaUserTag} title="Negotiable" />
        ) : (
          <InfoCard icon={FaTag} title="Fixed Price" />
        )}
        {/* <Spacer /> */}
        {ad.is_used ? (
          <InfoCard
            icon={BiSolidBandAid}
            title="Used"
            subtitle={stringifyUsageTime(
              ad.usage_time!.years,
              ad.usage_time!.months,
              ad.usage_time!.days
            )}
          />
        ) : (
          <InfoCard icon={FaLeaf} title="New" />
        )}
      </Grid>
      <Spacer height={16} />
      <DescriptionCard
        description={ad.description}
        address_latitude={ad.address!.latitude}
        address_longitude={ad.address!.longitude}
        address_description={ad.address!.description}
        handleChatClick={ad.handleChatClick}
      />
    </>
  );
};

export default AdDetails;
