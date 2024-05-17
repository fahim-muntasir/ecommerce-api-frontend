
import Header from "../components/Header";
import Footer from "../components/Footer";
import Proptypes from "prop-types";
import React from "react";

const MainLayout = ({ children }) => {
  return (
        <React.Fragment>
      <Header />
      {children}
      <Footer />
      </React.Fragment>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node 
};
