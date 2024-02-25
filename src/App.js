import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loader from "./components/ui/loader";
import Navbar from "./components/ui/nav-bar";
const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
