import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loader from "./components/ui/loader";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Profile from "./pages/profile";
import AuthProvider from "./components/provider/auth-provider";
import Layout from "./components/ui/layout";

const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));
const Crops = lazy(() => import("./pages/crops"));
const History = lazy(() => import("./pages/history"));
const ResetPassword = lazy(() => import("./pages/reset-password"));
const ErrorPage = lazy(() => import("./pages/error-page"));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                index
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/crops/:cropId"
                element={
                  <Layout>
                    <Crops />
                  </Layout>
                }
              />
              <Route
                path="/history"
                element={
                  <Layout>
                    <History />
                  </Layout>
                }
              />
              <Route
                path="/fertilizer/:fertilizerId"
                element={
                  <Layout>
                    <Crops />
                  </Layout>
                }
              />
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            </Routes>
          </Suspense>
          <Toaster position="bottom-right" />
        </>
      </AuthProvider>
    </Router>
  );
};

export default App;
