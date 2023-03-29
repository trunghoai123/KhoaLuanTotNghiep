import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Search from "components/Search";
import DropdownManage from "components/Dopdown/ButtonDropDown";
import Button from "components/Button/Button";
import { colors } from "variables";

const AreaEditAdminStyles = styled.div`
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

const AreaEditAdmin = (props) => {
  return (
    <AreaEditAdminStyles>
      <div className="top__actions">
        <Search placeHolder="Tìm Kiếm"></Search>
        <DropdownManage>
          <li>
            <div className="dropdown-item dropdown__item" href="/">
              Thêm Phòng
            </div>
          </li>
        </DropdownManage>
      </div>
      {/* <div className="properties__container">
        <div className="input__container">
          <div className="input__row">
            <input className="input__prop" type="text" placeholder="Mã khu vực" name="area-id" />
            <input className="input__prop" type="text" placeholder="Tên khu vực" name="area-name" />
            <input
              className="input__prop"
              type="text"
              placeholder="Vị trí cụ thể"
              name="area-concrete"
            />
          </div>
          <div className="input__row row__bot">
            <textarea
              rows={3}
              className="input__prop"
              placeholder="Mô tả"
              name="area-describe"
            ></textarea>
            <input
              accept=".png, .jpg, .jpeg, .pdf"
              className="input__prop input__file"
              type="file"
              name="area-image"
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
      </div> */}
      <table className="main__table table table-striped">
        <thead className="table__head--container">
          <tr className="table__row">
            <th className="table__head item__id" scope="col">
              Mã Phòng
            </th>
            <th className="table__head" scope="col">
              Tên Phòng
            </th>
            <th className="table__head" scope="col">
              Số Chỗ Ngồi Tối Đa
            </th>
            <th className="table__head" scope="col">
              Trạng Thái
            </th>
            <th className="table__head" scope="col">
              Hình Ảnh
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {Array(10)
            .fill(0)
            .map((item, index) => {
              return (
                <tr className="table__row" key={index}>
                  <td className="table__data item__id">{"R" + index}</td>
                  <td className="table__data">{"C" + (index + 1)}</td>
                  <td className="table__data">{(Math.floor(Math.random() * 100) + 25) * 2}</td>
                  <td className="table__data">
                    {Math.floor(Math.random() * 100) % 2 === 0 ? "Đang Trống" : "Đang Dùng"}
                  </td>
                  <td className="table__data data__image">
                    <div className="img__container">
                      <img
                        className="data__img"
                        src={`/images/vip_room_${Math.floor(Math.random() * 3) + 1}.jpg`}
                        alt="area-img"
                      />
                    </div>
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
    </AreaEditAdminStyles>
  );
};

AreaEditAdmin.propTypes = {};

export default AreaEditAdmin;
