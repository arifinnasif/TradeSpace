import { FunctionComponent } from "react";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet-async";
import FooterComponent from "../components/Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  loading?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  loading,
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || "Home"} | TradeSpace </title>
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
        <Navbar />
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
      </div>
    </>
  );
};

export default Layout;
