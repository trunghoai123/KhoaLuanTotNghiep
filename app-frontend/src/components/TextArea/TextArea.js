import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";
const TextAreaStyles = styled.textarea`
  width: 100%;
  border: 1px solid ${colors.gray_1};
  outline: none;
  padding: ${(props) => props.padding};
  resize: ${(props) => props.resize};
`;

const TextArea = React.forwardRef(
  ({ rows = "4", resize = "auto", placeholder = "", name = "", padding = "4px", ...rest }, ref) => {
    return (
      <TextAreaStyles
        name={name}
        placeholder={placeholder}
        padding={padding}
        resize={resize}
        rows={rows}
        ref={ref}
        {...rest}
      ></TextAreaStyles>
    );
  }
);

TextArea.propTypes = {
  rows: PropTypes.string,
  resize: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  padding: PropTypes.string,
};
export default TextArea;
