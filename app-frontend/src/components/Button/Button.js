import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const ButtonStyles = styled.button`
  user-select: none;
  display: inline-block;
  outline: none;
  border: none;

  transition: background-color ease 150ms;
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => (props.to ? "0px" : props.padding)};
  color: ${(props) => props.textColor};
  ${(props) => {
    return props.disabled
      ? css`
          opacity: 0.5;
          cursor: auto;
        `
      : css`
          cursor: pointer;
        `;
  }}
  :hover {
    background-color: ${(props) => (props.disabled ? "" : props.bgHover)};
  }
  .link__button {
    display: "inline-block";
    text-decoration: none;
    color: white;
    padding: ${(props) => (!props.to ? "0px" : props.padding)};
  }
`;

const Button = ({
  to = "",
  padding = "10px",
  className,
  textColor = "white",
  bgColor = "grey",
  bgHover = "black",
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <ButtonStyles
      bgHover={bgHover}
      bgColor={bgColor}
      padding={padding}
      textColor={textColor}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {to ? (
        <Link className="link__button" to={to}>
          {children}
        </Link>
      ) : (
        children
      )}
    </ButtonStyles>
  );
};

Button.propTypes = {
  padding: PropTypes.string,
  className: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
