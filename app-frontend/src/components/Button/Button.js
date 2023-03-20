import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonStyles = styled.button`
  user-select: none;
  display: inline-block;
  outline: none;
  border: none;
  cursor: pointer;
  transition: background-color ease 150ms;
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => (props.to ? "0px" : props.padding)};
  color: ${(props) => props.textColor};
  :hover {
    background-color: ${(props) => props.bgHover};
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
  ...rest
}) => {
  return (
    <ButtonStyles
      bgHover={bgHover}
      bgColor={bgColor}
      padding={padding}
      textColor={textColor}
      className={className}
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
