import "styles/index.scss";
import "styles/__reset.scss";

import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Footer from "layout/Footer";
import Header from "layout/Header";
import AdminHeader from "layout/AdminHeader";

const AppAdmin = (props) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

AppAdmin.propTypes = {};

export default AppAdmin;
