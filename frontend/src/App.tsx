import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

import Things from "./components/Things";
import GetAds from "./components/Ads/GetAds";
import Register from "./components/Register/RegisterSteps";
import PostAd from "./components/Ads/PostAd";

import Navbar from "./components/Navbar/Navbar";

import AdDetils from "./components/AdDetails";
import CategoryList from "./components/Homepage/CategoryList";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/things/:id/" element={<Things />} />

          <Route path="/ads/" element={<GetAds />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/ads/post-ad/" element={<PostAd />} />
          <Route path="/ads/:id/" element={<AdDetils />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
