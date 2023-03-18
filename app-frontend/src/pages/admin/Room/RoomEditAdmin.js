import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Search from "components/Search";
import DropdownManage from "components/Dopdown/ButtonDropDown";
import Button from "components/Button/Button";
import { colors } from "variables";

const RoomEditAdminStyles = styled.div`
  padding-top: 54px;
  .top__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
  }

  .properties__container {
    padding: 20px 30px;
    .input__container {
      .input__row {
        &.row__bot {
          display: flex;
          textarea {
            resize: none;
          }
          .input__file {
            align-self: flex-end;
            cursor: pointer;
          }
        }
        .radios__container {
          display: flex;
          justify-content: space-around;
          width: 300px;
          padding: 6px 10px;
          margin: 0px 12px 12px 0px;
          .radio__container {
            .input__radio {
            }
            .label {
              margin-left: 8px;
              user-select: none;
              cursor: pointer;
            }
          }
        }

        .input__prop {
          margin: 0px 12px 12px 0px;
          border-radius: 0px;
          outline: none;
          width: 300px;
          border: 1px solid ${(props) => colors.gray_1};
          padding: 6px 10px;
          transition: border ease 150ms;
          &:hover {
            border: 1px solid ${(props) => colors.gold_1};
          }
          &:focus {
            border: 1px solid ${(props) => colors.gold_1};
          }
        }
      }
    }
  }
  .main__table {
    .table__head--container {
      .table__row {
        .table__head {
        }
      }
    }
    .table__body {
      .table__row {
        .table__data {
          width: 200px;
          overflow-wrap: break-word;
          &.item__id {
            width: 100px;
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &.data__image {
            width: 200px;
            .img__container {
              width: 100%;
              .data__img {
                margin: 0px;
                object-fit: cover;
                width: 150px;
                height: 80px;
              }
            }
          }
          .button {
            margin-left: 8px;
            &.button__update {
            }
            &.button__remove {
            }
            .text {
            }
            .icon__item {
              margin-left: 6px;
            }
          }
        }
      }
    }
  }
`;

const RoomEditAdmin = (props) => {
  return (
    <RoomEditAdminStyles>
      <div className="top__actions">
        <Search placeHolder="Tìm Kiếm"></Search>
        <DropdownManage>
          <li>
            <div className="dropdown-item dropdown__item" href="/">
              Thêm Bàn
            </div>
          </li>
        </DropdownManage>
      </div>

      <div className="properties__container">
        <div className="input__container">
          <div className="input__row">
            <input className="input__prop" type="text" placeholder="Mã phòng" name="room-id" />
            <input className="input__prop" type="text" placeholder="Tên phòng" name="room-name" />
            <input
              className="input__prop"
              type="text"
              placeholder="Số chỗ ngồi tối đa"
              name="room-max-capacity"
            />
          </div>
          <div className="input__row row__bot">
            <div className="radios__container">
              <div className="radio__container">
                <input className="input__radio" type="radio" name="state" id="radio_emp" />
                <label className="label" htmlFor="radio_emp">
                  Đang trống
                </label>
              </div>
              <div className="radio__container">
                <input className="input__radio" type="radio" name="state" id="radio_non-emp" />
                <label className="label" htmlFor="radio_non-emp">
                  Đang dùng
                </label>
              </div>
            </div>
            <input
              accept=".png, .jpg, .jpeg, .pdf"
              className="input__prop input__file"
              type="file"
              name="room-image"
            />
          </div>
        </div>
        <div className="button__container">
          <Button
            className="button button__update"
            bgHover={colors.orange_1_hover}
            bgColor={colors.orange_1}
          >
            <div>Cập Nhật</div>
          </Button>
        </div>
      </div>
      <table className="main__table table table-striped">
        <thead className="table__head--container">
          <tr className="table__row">
            <th className="table__head item__id" scope="col">
              Mã Bàn
            </th>
            <th className="table__head" scope="col">
              Số Thứ Tự
            </th>
            <th className="table__head" scope="col">
              Số Chỗ Ngồi
            </th>
            <th className="table__head" scope="col">
              Trạng Thái
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {Array(10)
            .fill(0)
            .map((item, index) => {
              return (
                <tr className="table__row" key={index}>
                  <td className="table__data item__id">{"B" + index}</td>
                  <td className="table__data">{index + 1}</td>
                  <td className="table__data">{(Math.floor(Math.random() * 10) + 1) * 2}</td>
                  <td className="table__data">
                    {Math.floor(Math.random() * 100) % 2 === 0 ? "Đang Trống" : "Đang Dùng"}
                  </td>
                  <td className="table__data">
                    <Button
                      to={`/admin/room/${"R" + index}`}
                      className="button button__update"
                      bgHover={colors.orange_1_hover}
                      bgColor={colors.orange_1}
                    >
                      <div>
                        <span className="text">Cập Nhật</span>
                        <i className="icon__item fa-solid fa-pen-to-square"></i>
                      </div>
                    </Button>
                    <Button
                      className="button button__remove"
                      bgHover={colors.red_1_hover}
                      bgColor={colors.red_1}
                    >
                      <div>
                        <span className="text">Xóa</span>
                        <i className="icon__item fa-solid fa-trash-can"></i>
                      </div>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </RoomEditAdminStyles>
  );
};

RoomEditAdmin.propTypes = {};

export default RoomEditAdmin;
