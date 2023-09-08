import { FunctionComponent } from "react";
import { AdDetailsType } from "../../../services/ad.service";
import { Container, Center } from "@chakra-ui/react";
import TopCard from "./TopCard";

const AdDetils: FunctionComponent<AdDetailsType> = (ad) => {
  return (
    <Center>
      <TopCard />
    </Center>
  );
};

export default AdDetils;
