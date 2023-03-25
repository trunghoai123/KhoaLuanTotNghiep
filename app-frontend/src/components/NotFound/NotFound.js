import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const NotFoundStyles = styled.div`
  height: 100vh;
  text-align: center;
  .container__error {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .code__error {
      font-size: 95px;
    }
    .messsage__oops {
      font-size: 25px;
    }
    .messsage__error {
      font-size: 25px;
    }
  }
`;

const NotFound = (props) => {
  return (
    <NotFoundStyles>
      <div className="container__error">
        <div className="code__error">404</div>
        <div className="messsage__oops">Oops!</div>
        <div className="messsage__error">Page Not Found</div>
      </div>
    </NotFoundStyles>
  );
};

NotFound.propTypes = {};

export default NotFound;
