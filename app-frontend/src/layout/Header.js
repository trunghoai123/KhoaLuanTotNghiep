import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "../variables";
import { Link, NavLink } from "react-router-dom";

const HeaderStyles = styled.div`
  position: fixed;
  width: 100%;
  z-index: 111;
  height: 54px;
  font-size: 15px;
  background-color: ${colors.gold_1};
  user-select: none;
  .navbar__list {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    color: white;
    .profile__container {
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      .img__container {
        width: 44px;
        position: relative;
        padding-bottom: 5px;
        .img__profile {
          width: 100%;
          border: 2px solid whiteSmoke;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
        }
        .menu__hovered {
          transition: all ease 150ms;
          background-color: white;
          color: black;
          display: none;
          position: absolute;
          top: 100%;
          right: 0%;
          width: 160px;
          box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.6);
          .menu__list {
            .menu__item {
              text-decoration: none;
              color: black;
              display: block;
              padding: 10px;
              :hover {
                background-color: lightGray;
              }
            }
          }
        }
        :hover {
          .menu__hovered {
            display: block;
          }
        }
      }
    }
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
          <NavLink className="navlink" to={"dishes"}>
            Thực Đơn
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"area"}>
            Khu Vực
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={""}>
            Phòng
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink image__container" to={"/"}>
            <img className="logo__image" src="/images/logo.png" alt="logo" />
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/orders"}>
            Phiếu Đặt
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/blog"}>
            Liên Hệ
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
        <div className="profile__container">
          <div className="img__container">
            <img className="img__profile" src="/images/VIP_room.jpg" alt="" />
            <div className="menu__hovered">
              <div className="menu__list">
                <Link to={"/"} className="menu__item">
                  Thông tin tài khoản
                </Link>
                <Link to={"/"} className="menu__item">
                  Phiếu đặt
                </Link>
                <Link to={"/"} className="menu__item">
                  Đăng xuất
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

Header.propTypes = {};

export default Header;
