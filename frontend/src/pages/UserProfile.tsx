import { Container } from "@chakra-ui/layout";
import SummaryBar from "../components/User/SummaryBar/SummaryBar";
import Layout from "../layout/Layout";

const UserProfile = () => {
  return (
    <Layout title="User Profile">
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
        <SummaryBar />
      </Container>
    </Layout>
  );
};

export default UserProfile;
