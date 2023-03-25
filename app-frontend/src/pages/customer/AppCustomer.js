import "styles/index.scss";
import "styles/__reset.scss";

import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Footer from "layout/Footer";
import Header from "layout/Header";

const AppCustomer = (props) => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

AppCustomer.propTypes = {};

export default AppCustomer;
