import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "variables";
const NavbarItemStyles = styled.div`
  cursor: pointer;
  /* height: 100%; */
  display: flex;
  align-items: center;
  width: 120px;
  width: 100%;
  text-align: center;
  transition: all ease 150ms;
  :hover {
    .navlink {
      background-color: ${(props) => colors.gold_1};
    }
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
    justify-content: flex-start;
    padding-left: 40px;
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
      text-align: start;
      text-indent: 60px;
      :hover {
        background-color: ${colors.gold_1};
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
`;

const NavbarItem = ({ navItem }) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <NavbarItemStyles key={navItem?.id} className="link__container menu__list">
      <span onClick={handleExpand} className="navlink" to={"/admin/area"}>
        {navItem?.title}
        {navItem?.subNavs?.length > 0 && (
          <div className="down__icon__container">
            {expand ? (
              <i className="fa-solid fa-caret-right"></i>
            ) : (
              <i className="fa-solid fa-caret-down"></i>
            )}
          </div>
        )}
      </span>
      {expand && (
        <div className="sublinks__container">
          {navItem.subNavs.map((subNav) => {
            return (
              <NavLink to={subNav?.to} key={subNav?.id} className="sublink">
                {subNav?.title}
              </NavLink>
            );
          })}
        </div>
      )}
    </NavbarItemStyles>
  );
};

NavbarItem.propTypes = {};

export default NavbarItem;
