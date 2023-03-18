import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";
const InputTextStyles = styled.input`
  width: 100%;
  border: 1px solid ${colors.gray_1};
  outline: none;
  padding: ${(props) => props.padding};
`;

const Input = ({ type = "text", placeholder = "", name = "", padding = "6px 12px", ...rest }) => {
  return (
    <InputTextStyles
      type={type}
      name={name}
      placeholder={placeholder}
      padding={padding}
      {...rest}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  padding: PropTypes.string,
};

export default Input;
