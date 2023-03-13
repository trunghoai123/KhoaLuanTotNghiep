import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";
import { colors } from "variables";
import Search from "components/Search";
import DropdownManage from "components/Dopdown";
import axiosClient from "utils/api";

const AreaAdminStyles = styled.div`
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

const AreaAdmin = (props) => {
  const [areas, setAreas] = useState();
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const result = await axiosClient.get("area/getAllArea", {});
        if (result?.data?.data) {
          setAreas(result.data.data);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchDishes();
  }, []);
  return (
    <AreaAdminStyles>
      <div className="top__actions">
        <Search placeHolder="Tìm Kiếm"></Search>
        <DropdownManage>
          <li>
            <div className="dropdown-item dropdown__item" href="/">
              Thêm Khu Vực
            </div>
          </li>
        </DropdownManage>
      </div>
      <table className="main__table table table-striped">
        <thead className="table__head--container">
          <tr className="table__row">
            <th className="table__head item__id" scope="col">
              Mã Khu Vực
            </th>
            <th className="table__head" scope="col">
              Tên Khu Vực
            </th>
            <th className="table__head" scope="col">
              Vị Trí Cụ Thể
            </th>
            <th className="table__head" scope="col">
              Mô Tả
            </th>
            <th className="table__head" scope="col">
              Hình Ảnh
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {areas?.map((area, index) => {
            return (
              <tr className="table__row" key={area?._id}>
                <td className="table__data item__id">{area._id}</td>
                <td className="table__data">{area?.TenKhuVuc}</td>
                <td className="table__data">{area?.MoTa}</td>
                <td className="table__data">{area?.ViTriCuThe}</td>
                <td className="table__data data__image">
                  <div className="img__container">
                    <img className="data__img" src={area?.HinhAnh} alt={area?.TenKhuVuc} />
                  </div>
                </td>
                <td className="table__data">
                  <Button
                    to={`/admin/area/${area?._id}`}
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
    </AreaAdminStyles>
  );
};

AreaAdmin.propTypes = {};

export default AreaAdmin;
