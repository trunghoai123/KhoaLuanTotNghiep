import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button/Button";
import { colors } from "variables";
import DropdownManage from "components/Dopdown/ButtonDropDown";
import Search from "components/Search";
import axiosClient from "utils/axios";
import { getAllRoom } from "utils/api";
import RoomUpdateForm from "components/Room/RoomUpdateForm";
import { confirmAlert } from "react-confirm-alert";
import { enqueueSnackbar } from "notistack";

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

const RoomAdmin = (props) => {
  const [rooms, setRoms] = useState();
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [mode, setMode] = useState({ mode: 0, id: null });
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const result = await getAllRoom();
        if (result?.data) {
          setRoms(result.data);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchRooms();
  }, []);
  const handleOpenUpdate = (id) => {
    if (id) {
      setMode({ id, mode: 1 });
    } else {
      setMode({ id: null, mode: 2 });
    }
    setOpenUpdateForm(true);
  };
  const handleCloseUpdateForm = () => {
    setMode({ id: null, mode: 0 });
    setOpenUpdateForm(false);
  };
  const handleDelete = (id) => {
    // const deleteArea = async (id) => {
    //   try {
    //     await deleteAreaById({ id });
    //     setMode({ ...mode });
    //     enqueueSnackbar("Đã xóa khu vực", {
    //       variant: "success",
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     enqueueSnackbar("Lỗi!. Không thể xóa khu vực", {
    //       variant: "error",
    //     });
    //   }
    // };
    // confirmAlert({
    //   title: "Xác nhận",
    //   message: "Bạn có muốn xóa khu vực đã chọn không",
    //   buttons: [
    //     {
    //       label: "Có",
    //       onClick: () => deleteArea(id),
    //     },
    //     {
    //       label: "Không",
    //       onClick: () => {},
    //     },
    //   ],
    // });
  };
  return (
    <RooomAdminStyles>
      <div className="top__actions">
        <Search placeHolder="Tìm Kiếm"></Search>
        <DropdownManage>
          <li>
            <div
              onClick={() => handleOpenUpdate(null)}
              className="dropdown-item dropdown__item"
              href="/"
            >
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
              Khu vực
            </th>
            <th className="table__head" scope="col">
              Số Chỗ Ngồi Tối Đa
            </th>
            <th className="table__head" scope="col">
              Hình Ảnh
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {rooms?.map((room, index) => {
            return (
              <tr className="table__row" key={room?._id}>
                <td className="table__data item__id">{room?.MaPhong}</td>
                <td className="table__data">{room?.TenPhong}</td>
                <td className="table__data">{room?.MaKhuVuc?.TenKhuVuc}</td>
                <td className="table__data">{room?.SoChoNgoiToiDa}</td>
                <td className="table__data data__image">
                  <div className="img__container">
                    <img className="data__img" src={room?.HinhAnh} alt="area-img" />
                  </div>
                </td>
                <td className="table__data">
                  <Button
                    className="button button__update"
                    bgHover={colors.orange_1_hover}
                    bgColor={colors.orange_1}
                    onClick={() => handleOpenUpdate(room?._id)}
                  >
                    <div>
                      <span className="text">Cập Nhật</span>
                      <i className="icon__item fa-solid fa-pen-to-square"></i>
                    </div>
                  </Button>
                  <Button
                    onClick={() => handleDelete(room?._id)}
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
      {openUpdateForm && (
        <RoomUpdateForm
          setMode={setMode}
          mode={mode}
          handleCloseForm={handleCloseUpdateForm}
        ></RoomUpdateForm>
      )}
    </RooomAdminStyles>
  );
};

RoomAdmin.propTypes = {};

export default RoomAdmin;
