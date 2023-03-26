import "styles/index.scss";
import "styles/__reset.scss";

import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Footer from "layout/Footer";
import AdminHeader from "layout/AdminHeader";
import { useAuthContext } from "utils/context/AuthContext";
import NotFound from "components/NotFound/NotFound";

const AppAdmin = (props) => {
  const { user, updateAuthUser } = useAuthContext();
  if (!user) return <NotFound></NotFound>;
  else
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
