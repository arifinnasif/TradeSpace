import { useEffect, useState } from "react";
import AdDetils from "../components/Ads/AdDetails/AdDetails";
import Layout from "../layout/Layout";
import { AdDetailsType, adService } from "../services/ad.service";
import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/react";

const AdDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ad, setAd] = useState<AdDetailsType>();
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ad_details = await adService.getAdDetails(+id!);
      setAd(ad_details);
      console.log(ad_details);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  return (
    <Layout title="Hello" loading={isLoading}>
      <Container maxW="7xl" py="8" px="0">
        {ad !== undefined ? <AdDetils {...ad} /> : null}
      </Container>
    </Layout>
  );
};

export default AdDetailsPage;
