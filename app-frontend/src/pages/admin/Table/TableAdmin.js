import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Search from "components/Search";
import DropdownManage from "components/Dopdown/ButtonDropDown";
import { colors } from "variables";
import Button from "components/Button/Button";
import axiosClient from "utils/axios";

const TableAdminStyles = styled.div`
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
            margin: 0px 0px 12px 8px;
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

const TableAdmin = (props) => {
  const [tables, setTables] = useState();
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const result = await axiosClient.get("table/getAllTable", {});
        if (result?.data?.data) {
          setTables(result.data.data);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchDishes();
  }, []);
  return (
    <TableAdminStyles>
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
              Phòng
            </th>
            <th className="table__head" scope="col">
              Số Chỗ Ngồi
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {tables?.map((table, index) => {
            return (
              <tr className="table__row" key={table?._id}>
                <td className="table__data item__id" title={table?.MaBan}>
                  {table?.MaBan}
                </td>
                <td className="table__data">{table?.SoThuTuBan}</td>
                <td className="table__data">{table?.MaPhong?.TenPhong}</td>
                <td className="table__data">{table?.SoChoNgoi}</td>
                <td className="table__data">
                  <Button
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
    </TableAdminStyles>
  );
};

TableAdmin.propTypes = {};

export default TableAdmin;
