import { Container } from "@chakra-ui/layout";
import SummaryBar from "../components/User/SummaryBar/SummaryBar";
import Layout from "../layout/Layout";
import Content from "../components/User/Content/ContentTab";
import { useState, useEffect } from "react";
import { userProfileType, userService } from "../services/User.service";

const UserProfile = () => {
  return (
    <Layout title="User Profile">
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
        <SummaryBar />
        <Content />
      </Container>
    </Layout>
  );
};

export default UserProfile;
