import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "../variables";
import { NavLink } from "react-router-dom";

const HeaderStyles = styled.div`
  position: fixed;
  width: 100%;
  z-index: 99999;
  height: 54px;
  font-size: 15px;
  background-color: ${colors.gold_1};
  user-select: none;
  .navbar__list {
    height: 100%;
    display: flex;
    justify-content: center;
    color: white;
    .link__container {
      height: 100%;
      display: flex;
      align-items: center;
      width: 120px;
      .navlink {
        line-height: 54px;
        width: 100%;
        height: 100%;
        font-weight: 300;
        display: flex;
        justify-content: center;
        color: white;
        text-transform: uppercase;
        text-decoration: none;
        &.image__container {
          height: 100%;
        }
        &:hover {
          color: white;
        }
        .logo__image {
          height: 100%;
        }
      }
      &.external__links {
        column-gap: 8px;
        justify-content: center;
        .link__external {
          .external__link {
            color: white;
            font-size: 18px;
            :hover {
              color: white;
            }
          }
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
            Trang Chủ
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/booking"}>
            Đặt Bàn
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/dishes"}>
            Món Ăn
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/introdution"}>
            Giới Thiệu
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink image__container" to={"/"}>
            <img className="logo__image" srcSet={"images/logo.png"} alt="logo" />
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/contact"}>
            Bài Viết
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/blog"}>
            Liên Hệ
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/about"}>
            Chính Sách
          </NavLink>
        </div>
        <div className="link__container external__links">
          <span className="link__external">
            <a className="external__link" href="/">
              <i className="fa-brands fa-square-youtube"></i>
            </a>
          </span>
          <span className="link__external">
            <a className="external__link" href="/">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </span>
          <span className="link__external">
            <a className="external__link" href="/">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </span>
        </div>
      </div>
    </HeaderStyles>
  );
};

Header.propTypes = {};

export default Header;
