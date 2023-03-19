import "./styles/index.scss";
import "./styles/__reset.scss";

import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useDispatch } from "react-redux";
import { createCart } from "store/cart/cartSlice";

const App = (props) => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

App.propTypes = {};

export default App;
