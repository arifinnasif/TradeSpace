import { FunctionComponent } from "react";
import { AdDetailsType } from "../../../services/ad.service";
import { Center } from "@chakra-ui/react";
import TopCard from "./TopCard";
import InfoCard from "./InfoCard";

const AdDetils: FunctionComponent<AdDetailsType> = (ad) => {
  return (
    <>
      <Center>
        <TopCard />
      </Center>
      <InfoCard />
    </>
  );
};

export default AdDetils;
