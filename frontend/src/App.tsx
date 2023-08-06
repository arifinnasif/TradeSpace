import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

import Things from "./components/Things";
import GetAds from "./components/Ads/GetAds";
import Register from "./components/Register/RegisterSteps";
import PostAd from "./components/Ads/PostAd";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Routes>
          <Route path="/things/:id/" element={<Things />} />
          <Route path="/ads/" element={<GetAds />} />
          <Route path="/register/" element= {<Register />} />
          <Route path="/ads/post-ad/" element = {<PostAd />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
