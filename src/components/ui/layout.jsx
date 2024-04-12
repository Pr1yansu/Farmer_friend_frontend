import React from "react";
import Navbar from "./nav-bar";
import ImageUploadModal from "../modal/image-uploader";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ImageUploadModal />
      {children}
    </>
  );
};

export default Layout;
