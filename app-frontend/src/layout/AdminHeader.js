import React, { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginForm from "components/Login/LoginForm";
import SignupForm from "components/Login/SignupForm";
import { useDispatch } from "react-redux";
import { useAuthContext } from "utils/context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { useFormStateContext } from "utils/context/FormStateContext";
import { colors } from "variables";

const AdminHeaderStyles = styled.div`
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
              cursor: pointer;
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
    .list__link__container {
      background-color: ${(props) => colors.gold_1_blur};
      position: absolute;
      left: 0px;
      height: 100vh;
      width: 200px;
      transition: all ease 300ms;
      &.hidden {
        left: -200px;
      }
      .icon__toggle__container {
        position: absolute;
        top: 0px;
        right: -54px;
        font-size: 20px;
        width: 54px;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        background-color: ${(props) => colors.gold_1};
        :hover {
          background-color: ${(props) => colors.gold_1_blur};
        }
      }
      .link__container {
        cursor: pointer;
        /* height: 100%; */
        display: flex;
        align-items: center;
        width: 120px;
        width: 100%;
        text-align: center;
        transition: all ease 150ms;
        :hover {
          background-color: ${(props) => colors.gold_1};
        }
        &.menu__list {
          display: block;
        }

        &.logo__container {
          left: 20px;
          top: 0px;
          position: absolute;
        }
        .navlink {
          position: relative;
          line-height: 54px;
          width: 100%;
          height: 100%;
          font-weight: 300;
          display: flex;
          justify-content: center;
          color: white;
          text-transform: uppercase;
          text-decoration: none;
          .down__icon__container {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate(-50%, -50%);
          }
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
        .sublinks__container {
          .sublink {
            display: block;
            color: white;
            text-decoration: none;
            :hover {
              background-color: ${colors.gold_1_blur};
            }
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
          .btn__login {
            font-size: 12px;
            cursor: pointer;
            :hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
`;

const AdminHeader = (props) => {
  // const [isSigningin, setIsSigningin] = useState(false);
  const { user, updateAuthUser } = useAuthContext();
  const {
    openSignIn,
    setOpenSignIn,
    openSignUp,
    setOpenSignUp,
    adminNavbarState,
    setAdminNavbarState,
  } = useFormStateContext();
  const navigation = useNavigate();
  const handleLogout = () => {
    updateAuthUser(null);
    enqueueSnackbar("Đã đăng xuất", {
      variant: "success",
    });
    navigation("/");
  };
  const handleToggleAdminNavbar = () => {
    setAdminNavbarState((oldState) => {
      return { ...oldState, isOpen: !oldState.isOpen };
    });
  };
  const handleSignIn = () => {
    setOpenSignIn(true);
  };
  const handleCloseLoginForm = () => {
    setOpenSignIn(false);
  };
  const handleSignup = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignupForm = () => {
    setOpenSignUp(false);
  };
  return (
    <AdminHeaderStyles>
      <div className="navbar__list">
        <div className={`list__link__container ${adminNavbarState?.isOpen ? "" : "hidden"}`}>
          <div className="icon__toggle__container" onClick={handleToggleAdminNavbar}>
            {adminNavbarState?.isOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-list-ul"></i>
            )}
          </div>
          <div className="link__container menu__list">
            <span className="navlink" to={"/admin/area"}>
              Khu vực
              <div className="down__icon__container">
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </span>
            <div className="sublinks__container">
              <NavLink className="sublink">Tìm kiếm</NavLink>
              <NavLink className="sublink">Cập nhật</NavLink>
            </div>
          </div>
          <div className="link__container">
            <span className="navlink" to={"/admin/room"}>
              Phòng
            </span>
          </div>
          <div className="link__container">
            <span className="navlink" to={"/admin/table"}>
              Bàn
            </span>
          </div>
          <div className="link__container">
            <span className="navlink" to={"/admin/booking"}>
              Đặt Bàn
            </span>
          </div>
          <div className="link__container">
            <span className="navlink" to={"/admin/blog"}>
              Tài khoản
            </span>
          </div>
        </div>
        <div className="profile__container">
          {!user && (
            <div className="link__container external__links">
              <span className="btn__login" onClick={handleSignup}>
                Đăng ký
              </span>
              <span className="btn__login" onClick={handleSignIn}>
                Đăng nhập
              </span>
            </div>
          )}
          {user && (
            <div className="img__container">
              <img className="img__profile" src="/images/VIP_room.jpg" alt="" />
              <div className="menu__hovered">
                <div className="menu__list">
                  <Link to={"/"} className="menu__item">
                    Thông tin tài khoản
                  </Link>
                  <Link to={"/"} className="menu__item">
                    Phiếu đặt
                  </Link>{" "}
                  <span onClick={handleLogout} className="menu__item">
                    Đăng xuất
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {openSignIn && <LoginForm handleCloseForm={handleCloseLoginForm}></LoginForm>}
      {openSignUp && <SignupForm handleCloseForm={handleCloseSignupForm}></SignupForm>}
    </AdminHeaderStyles>
  );
};

AdminHeader.propTypes = {};

export default AdminHeader;
