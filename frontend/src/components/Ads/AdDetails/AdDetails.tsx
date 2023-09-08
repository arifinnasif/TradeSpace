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
        For Sell
      </Heading>
      <Center>
        <TopCard />
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
