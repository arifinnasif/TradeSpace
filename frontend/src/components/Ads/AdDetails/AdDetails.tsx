import { FunctionComponent } from "react";
import { AdDetailsType } from "../../../services/ad.service";
import { Center, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import TopCard from "./TopCard";
import InfoCard from "./InfoCard";
import DescriptionCard from "./DesccriptionCard";

const AdDetils: FunctionComponent<AdDetailsType> = (ad) => {
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
          address={ad.address!.description}
          op_email={ad.op_email}
          op_phone={ad.phone}
          image={ad.image1}
        />
      </Center>
      <Spacer height={16} />

      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <InfoCard />
        {/* <Spacer /> */}
        <InfoCard />
        {/* <Spacer /> */}
        <InfoCard />
      </Grid>
      <Spacer height={16} />
      <DescriptionCard />
    </>
  );
};

export default AdDetils;
