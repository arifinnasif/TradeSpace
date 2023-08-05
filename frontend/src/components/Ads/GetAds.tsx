import { Link } from "react-router-dom";
import AdCard from "./AdCard.tsx";

function GetAds() {
  return (
    <Link to="/things/1">
      <AdCard />
    </Link>
  );
}

export default GetAds;
