import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

import Things from "./components/Things";
// import GetAds from "./components/Ads/GetAds";
import Register from "./components/Register/RegisterSteps";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/things/:id/" element={<Things />} />
          {/* <Route path="/ads/" element={<GetAds />} /> */}
          <Route path="/register/" element= {<div><Register /></div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
