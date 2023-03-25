import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../variables";

const HeaderStyles = styled.div`
  .footer {
    .footer__top {
    }
    .footer__bottom {
      padding: 12px 50px;
      display: flex;
      justify-content: space-between;
      font-weight: 300;
      color: white;
      background-color: ${colors.brown_shadow};
    }
    .bottom_left {
    }
    .bottom_right {
    }
  }
`;

const Footer = (props) => {
  return (
    <HeaderStyles>
      <div className="footer">
        <div className="footer__top"></div>
        <div className="footer__bottom">
          <div className="bottom_left">COPYRIGHT © | 2023 EVERGREEN GARDEN</div>
          <div className="bottom_right">DESIGNED BY TRUNG HOAI</div>
        </div>
      </div>
    </HeaderStyles>
  );
};

Footer.propTypes = {};

export default Footer;
