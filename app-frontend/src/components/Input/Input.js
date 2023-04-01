import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors } from "variables";
const InputTextStyles = styled.input`
  border: 1px solid ${colors.gray_1};
  outline: none;
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  ${(props) => {
    if (props.isImgFile)
      return css`
        text-indent: 9999px;
        height: 120px;
        background-image: url("${props.imgUrl}");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `;
  }}; ;
`;
const Input = React.forwardRef(
  (
    {
      width = "100%",
      type = "text",
      placeholder = "",
      name = "",
      padding = "6px 12px",
      isImgFile = false,
      imgUrl = "",
      ...rest
    },
    ref
  ) => {
    return (
      <InputTextStyles
        width={width}
        type={type}
        name={name}
        placeholder={placeholder}
        isImgFile={isImgFile}
        imgUrl={imgUrl}
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
  isImgFile: PropTypes.bool,
  padding: PropTypes.string,
  width: PropTypes.string,
};

export default Input;
