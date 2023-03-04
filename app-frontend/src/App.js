import './styles/index.scss';
import './styles/__reset.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './layout/Footer';
import Header from './layout/Header';

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
