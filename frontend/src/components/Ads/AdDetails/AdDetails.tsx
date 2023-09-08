import { FunctionComponent } from "react";
import { AdDetailsType } from "../../../services/ad.service";
import { Center, Flex, Grid, Spacer } from "@chakra-ui/react";
import TopCard from "./TopCard";
import InfoCard from "./InfoCard";

const AdDetils: FunctionComponent<AdDetailsType> = (ad) => {
  return (
    <>
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
    </>
  );
};

export default AdDetils;
