import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from '@chakra-ui/react';

import Things from './components/Things';

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner/>}>
        <Routes>
          
          <Route path="/things/:id/" element={<Things />} />
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );

}

export default App
