import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loader from "./components/ui/loader";
import Navbar from "./components/ui/nav-bar";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Profile from "./pages/profile";
import AuthProvider from "./components/provider/auth-provider";
import ImageUploadModal from "./components/modal/image-uploader";

const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));
const Crops = lazy(() => import("./pages/crops"));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <>
          <Navbar />
          <ImageUploadModal />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/crops/:cropId" element={<Crops />} />
              <Route path="/fertilizer/:fertilizerId" element={<Contact />} />
            </Routes>
          </Suspense>
          <Toaster position="bottom-right" />
        </>
      </AuthProvider>
    </Router>
  );
};

export default App;
