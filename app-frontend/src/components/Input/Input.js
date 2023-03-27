import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";
const InputTextStyles = styled.input`
  border: 1px solid ${colors.gray_1};
  outline: none;
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
`;

const Input = React.forwardRef(
  (
    { width = "100%", type = "text", placeholder = "", name = "", padding = "6px 12px", ...rest },
    ref
  ) => {
    return (
      <InputTextStyles
        width={width}
        type={type}
        name={name}
        placeholder={placeholder}
        padding={padding}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  padding: PropTypes.string,
};

export default Input;
