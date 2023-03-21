import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";
const SearchStyles = styled.div`
  padding: 10px;
  .input__group {
    width: 400px;
    .input {
      border-radius: 0px;
      :focus {
        box-shadow: none;
      }
    }
    .ms-n5 {
      z-index: 5;
      border-radius: 0px;
      :hover {
        .icon__search {
          color: black;
          transition: all ease 200ms;
        }
      }
    }
    .tail__container {
      margin-left: -40px;
    }
  }
`;

const Search = ({ placeHolder, ...rest }) => {
  return (
    <SearchStyles>
      <div className="input-group input__group">
        <input
          placeholder={placeHolder}
          className="form-control border-end-0 border input"
          type="search"
          id="example-search-input"
        />
        <span className="input-group-append tail__container">
          <button
            className="btn btn-outline-secondary bg-white border-start-0 border ms-n5"
            type="button"
          >
            <i className="icon__search fa fa-search"></i>
          </button>
        </span>
      </div>
    </SearchStyles>
  );
};

Search.propTypes = {
  placeHolder: PropTypes.string,
};

export default Search;
