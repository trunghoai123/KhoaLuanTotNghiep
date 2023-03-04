import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "../variables";
import { NavLink } from "react-router-dom";

const HeaderStyles = styled.div`
  font-size: 15px;
  background-color: ${colors.brown_1};
  user-select: none;
  .navbar__list {
    padding: 8px 0px 8px 0px;
    display: flex;
    justify-content: center;
    color: white;
    .link__container {
      .navlink {
        font-weight: 300;
        padding: 8px 24px 8px 24px;
        display: inline-block;
        color: ${colors.gray_1};
        text-transform: uppercase;
        text-decoration: none;
        &:hover {
          color: white;
        }
      }
      .link__external {
        .external__link {
          color: ${colors.gray_1};
        }
      }
    }
  }
`;

const Header = (props) => {
  return (
    <HeaderStyles>
      <div className="navbar__list">
        <div className="link__container">
          <NavLink className="navlink" to={"/"}>
            Home Page
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/booking"}>
            Booking
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/services"}>
            Services
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/Introdution"}>
            Introduction
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/Contact"}>
            Contact
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/Blog"}>
            Blog
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/About"}>
            About
          </NavLink>
        </div>
        <div className="link__container">
          <span className="link__external">
            <a className="external__link" href="/">
              <i class="fa-brands fa-square-youtube"></i>
            </a>
          </span>
          <span className="link__external">
            <a className="external__link" href="/">
              <i class="fa-brands fa-square-facebook"></i>
            </a>
          </span>
          <span className="link__external">
            <a className="external__link" href="/">
              <i class="fa-brands fa-twitter"></i>
            </a>
          </span>
        </div>
      </div>
    </HeaderStyles>
  );
};

Header.propTypes = {};

export default Header;
