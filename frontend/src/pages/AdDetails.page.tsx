import { useEffect, useState } from "react";
import AdDetails from "../components/Ads/AdDetails/AdDetails";
import Layout from "../layout/Layout";
import { AdDetailsType, adService } from "../services/ad.service";
import { useNavigate, useParams } from "react-router-dom";
import { Container, useToast } from "@chakra-ui/react";
import { getThread } from "../services/chat.service";

const AdDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ad, setAd] = useState<AdDetailsType>();
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ad_details = await adService.getAdDetails(+id!);
      ad_details.handleChatClick = () => handleChatClick();
      setAd(ad_details);
      console.log(ad_details);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const toast = useToast();

  const handleChatClick = async () => {
    console.log("Chat clicked");
    try {
      const { thread_id } = await getThread(+id!);
      console.log(thread_id);
      navigate(`/chat/`);
    } catch (error) {
      // show toast
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data.error,
        status: "error",
      });
    }
  };

  return (
    <Layout title={ad?.title} loading={isLoading}>
      <Container maxW="7xl" py="8" px="0">
        {ad !== undefined ? <AdDetails {...ad} /> : null}
      </Container>
    </Layout>
  );
};

export default AdDetailsPage;
