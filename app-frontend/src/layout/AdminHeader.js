import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "../variables";
import { NavLink } from "react-router-dom";

const AdminHeaderStyles = styled.div`
  position: fixed;
  width: 100%;
  z-index: 111;
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

const AdminHeader = (props) => {
  return (
    <AdminHeaderStyles>
      <div className="navbar__list">
        <div className="link__container">
          <NavLink className="navlink" to={"/admin"}>
            Trang Chủ
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/admin/area"}>
            Khu vực
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/admin/room"}>
            Phòng
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/admin/table"}>
            Bàn
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink image__container" to={"/admin"}>
            <img className="logo__image" src={"/images/logo.png"} alt="logo" />
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/admin/contact"}>
            Bài viết
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/admin/blog"}>
            Tài khoản
          </NavLink>
        </div>
        <div className="link__container">
          <NavLink className="navlink" to={"/admin/about"}>
            Chính Sách
          </NavLink>
        </div>
        <div className="link__container external__links">
          <span className="link__external">
            <a className="external__link" href="/admin/">
              <i className="fa-brands fa-square-youtube"></i>
            </a>
          </span>
          <span className="link__external">
            <a className="external__link" href="/admin/">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </span>
          <span className="link__external">
            <a className="external__link" href="/admin/">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </span>
        </div>
      </div>
    </AdminHeaderStyles>
  );
};

AdminHeader.propTypes = {};

export default AdminHeader;
