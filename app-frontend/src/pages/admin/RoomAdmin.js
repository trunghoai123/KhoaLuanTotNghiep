import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";
import { colors } from "variables";
import DropdownManage from "components/Dopdown";
import Search from "components/Search";

const RooomAdminStyles = styled.div`
  padding-top: 54px;
  .top__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
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

const RoomAdmin = (props) => {
  return (
    <RooomAdminStyles>
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
                <tr className="table__row">
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
                      to={`${"R" + index}`}
                      className="button button__update"
                      bgHover={colors.orange_1_hover}
                      bgColor={colors.orange_1}
                    >
                      <span className="text">Cập Nhật</span>
                      <i className="icon__item fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button
                      className="button button__remove"
                      bgHover={colors.red_1_hover}
                      bgColor={colors.red_1}
                    >
                      <span className="text">Xóa</span>
                      <i className="icon__item fa-solid fa-trash-can"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </RooomAdminStyles>
  );
};

RoomAdmin.propTypes = {};

export default RoomAdmin;
