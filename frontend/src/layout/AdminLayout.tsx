import { FunctionComponent } from "react";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet-async";
import FooterComponent from "../components/Footer/Footer";
import SimpleSidebar from "../components/Sidebar/Sidebar";
import { Box, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
  // children: React.ReactNode;
  title?: string;
  loading?: boolean;
}

const AdminLayout: FunctionComponent<AdminLayoutProps> = ({
  // children,
  title,
  loading,
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || "Home"} | TradeSpace Admin </title>
        <meta
          name="description"
          content="A marketplace for buying and selling used items"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeSpace" />
        <meta
          property="og:description"
          content="A marketplace for buying and selling used items"
        />

        <meta property="og:site_name" content="TradeSpace" />

        <meta
          name="twitter:description"
          content="A marketplace for buying and selling used items"
        />
        <meta name="twitter:title" content="TradeSpace" />
      </Helmet>
      <div>
        <AdminNavbar />
        <Flex>
          <SimpleSidebar />
          {/* <Box></Box> */}
          <Spacer />
          <Box w={"88%"}>
            <main>
              <Box id="nasif">
                <Outlet />
              </Box>
              <FooterComponent />
            </main>
          </Box>
        </Flex>
        {/* <SimpleSidebar /> */}
        {/* {loading ? (
          <>
            <Spinner size={"100px"} />
          </>
        ) : (
          <div>
            <main>{children}</main>
          </div>
        )}
        <FooterComponent /> */}

        {/* <Grid
          templateAreas={`"sidebar_section main_section"`}
          gridTemplateRows={"20px 1fr"}
          // gridTemplateColumns={"400px 1fr"}
          // h='200px'
          // w='100%'
          // gap="3"
          // color="blackAlpha.700"
          // fontWeight="bold"
          // mx="70px"
        >
          <GridItem
            // py="2"
            // textAlign="center"
            // bg="orange.300"
            area={"sidebar_section"}
          >
            <SimpleSidebar />
          </GridItem>
          <GridItem area={"main_section"}>
            {loading ? (
              <>
                <Spinner size={"100px"} />
              </>
            ) : (
              <div>
                <main>{children}</main>
              </div>
            )}
            <FooterComponent />
          </GridItem>
        </Grid> */}
      </div>
    </>
  );
};

export default AdminLayout;
