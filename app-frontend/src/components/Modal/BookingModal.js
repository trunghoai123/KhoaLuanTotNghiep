import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextArea from "components/TextArea/TextArea";
import Button from "components/Button/Button";
import { colors } from "variables";
import Input from "components/Input/Input";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosClient from "utils/axios";
import { getDishById, getLinkFromImageFile } from "store/dish/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "store/order/orderSlice";
import { enqueueSnackbar } from "notistack";
import { redirect, useNavigate } from "react-router";
import axios from "axios";
import { useAuthContext } from "utils/context/AuthContext";
const BookingModalStyles = styled.div`
  transition: all ease 200ms;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100vh;
  .main__form {
    .overlay {
      transition: all ease 200ms;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .modal__main {
      transition: all ease 200ms;
      border-radius: 6px;
      padding: 20px 5px 20px 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 60%;
      height: 90%;
      display: flex;
      flex-direction: column;
      .modal__title {
        .title__container {
          .title__text {
          }
        }
      }
      .modal__footer {
        padding: 20px 0 0 0;
        border-top: 1px solid ${colors.gray_1};
        .btn__container {
          display: flex;
          justify-content: flex-end;
          .btn__confirm {
          }
        }
      }
      .modal__body {
        flex: 1;
        overflow: auto;
        padding-right: 10px;
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: lightgrey;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #888;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .general__infor {
          .group__title {
            padding-bottom: 20px;
            text-align: center;
            border-top: 1px solid lightgray;
          }
          .row__container {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            column-gap: 20px;
            .value__container {
              position: relative;
              width: 50%;
              .label__container {
                padding-bottom: 6px;
                min-width: 20%;
                .label {
                }
              }
              .input__container {
                &.phone__input__container {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  column-gap: 12px;
                  .shared__place {
                    /* width: auto; */
                    /* flex: 1; */
                  }
                  .btn__search--phone {
                    /* margin-left: auto; */
                  }
                }
                &.time__picker__container {
                  position: relative;
                  display: flex;
                  align-items: center;
                  .time__picker {
                    padding-right: 60px;
                  }
                  .additonal__tail {
                    padding-left: 20px;
                    flex: 1;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                  }
                }
                .input__text {
                }
              }
              .error__container {
                position: absolute;
                bottom: -20px;
                left: 0px;
                color: red;
                font-size: 13px;
                .error__message {
                }
              }
            }
          }
        }
        .main__infor {
          .type__tabs {
            padding-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            border-bottom: 1px solid ${colors.gold_1};
            margin-bottom: 10px;
            .type__tab {
              min-width: 76px;
              text-align: center;
              background-color: ${colors.light_gray_1};
              border: 1px solid ${colors.gray_1};
              padding: 4px 10px;
              &.left {
                border-radius: 5px 0px 0px 0px;
              }
              &.right {
                border-radius: 0px 5px 0px 0px;
              }
              &.active {
                background-color: ${colors.gold_1};
                color: white;
              }
            }
          }
          .row__container {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            column-gap: 20px;
            .value__container {
              position: relative;
              place-self: flex-start;
              width: 50%;
              .label__container {
                padding-bottom: 6px;
                min-width: 20%;
                .label {
                }
              }
              .input__container {
                &.time__picker__container {
                  position: relative;
                  display: flex;
                  align-items: center;
                  .time__picker {
                    padding-right: 60px;
                  }
                  .additonal__tail {
                    padding-left: 20px;
                    flex: 1;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                  }
                }
                &.radio__group {
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  .radio__container {
                    display: flex;
                    align-items: center;
                    .radio__label {
                      user-select: none;
                      padding-right: 20px;
                    }
                    .input__radio {
                    }
                  }
                }
                .input__text {
                }
              }
              .error__container {
                position: absolute;
                bottom: -20px;
                left: 0px;
                color: red;
                font-size: 13px;
                .error__message {
                }
              }
            }
          }
        }
      }
    }
  }
`;

const schema = yup
  .object({
    phone: yup
      .string("hãy xem lại số điện thoại")
      .matches(/[0][0-9][0-9]{8}/, "hãy nhập đúng định dạng số điện thoại")
      .required("hãy nhập số lượng"),
    fullname: yup
      .string("hãy xem lại họ tên")
      .matches(
        /^(([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\s\'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]))*$/,
        "hãy kiểm tra lại họ tên"
      )
      .required("hãy nhập họ tên"),
    size: yup.string("hãy xem lại số lượng").required("hãy nhập số lượng"),
    time: yup.string("hãy xem lại thời gian").required("hãy nhập thời gian"),
    date: yup.string("hãy xem lại ngày").required("hãy chọn ngày"),
    kind: yup.string("hãy xem lại loại").required("hãy chọn loại"),
    // duration: yup.string("hãy xem lại thời gian").required("hãy nhập thời gian"),
    note: yup.string(),
    // image: yup.string().required(),
  })
  .required();
const BookingModal = ({ handleCloseForm = () => {}, cartItems = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState();
  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid, isLoading, isSubmitting },
  } = useForm({
    defaultValues: {
      size: "2",
      time: "07:43",
      date: "2023-03-15",
      kind: "0",
      note: "Không có gì",
      image: "",
      phone: "",
      fullname: "",
      // phone: "006461526",
      // fullname: "Nguyễn Trung Hoài",
    },
    resolver: yupResolver(schema),
  });
  const { user, updateAuthUser } = useAuthContext();
  useEffect(() => {
    // if (user.LoaiTaiKhoan === 0) {
    // setValue("fullname", "trung hoai");
    // setValue("phone", "0906461526");
    // }
  }, [user]);
  const onSubmit = (data) => {
    if (isValid) {
      const { size, date, time, kind, note, image } = data;
      let startAt = new Date(new Date(date + "T" + time));
      // let addedDate = new Date(
      //   new Date(date + "T" + time).setHours(
      //     new Date(date + "T" + time).getHours() + Number(duration)
      //   )
      // );
      // let endAt = addedDate;
      // console.log(new Date(new Date(date + "T" + time)).getTime());
      const now = new Date();
      // console.log(now.getTime());
      // console.log(new Date(now.setUTCHours(now.getUTCHours() + 7)).toUTCString());
      if (startAt.getTime() <= new Date(now.setUTCHours(now.getUTCHours())).getTime()) {
        enqueueSnackbar("phải đặt sau thời gian hiện tại", {
          variant: "warning",
          preventDuplicate: true,
          autoHideDuration: 4000,
        });
      } else if (
        // endAt.getHours() >= 23 ||
        // endAt.getHours() <= 6 ||
        startAt.getHours() <= 6 ||
        startAt.getHours() >= 22
      ) {
        enqueueSnackbar("hãy xem lại thời gian (nhà hàng đóng của vào 11 giờ tối)", {
          variant: "warning",
          preventDuplicate: true,
          autoHideDuration: 5000,
        });
      } else {
        let clonedCartItems = [];
        cartItems.forEach((item) => {
          clonedCartItems.push({
            MaThucDon: item._id,
            SoLuong: item.SoLuong,
          });
        });
        const order = {
          LoaiPhieuDat: bookingType ? 0 : kind === "0" ? 1 : 2,
          TrangThai: Number(0),
          SoLuongNguoi: Number(size),
          ThoiGianBatDau: startAt,
          // ThoiGianKetThuc: endAt,
          MaKhachHang: user._id,
          ListThucDon: clonedCartItems,
          Email: user.Email,
          ListPhong: null,
          ListBan: null,
        };
        setLoading(true);
        dispatch(addOrder(order))
          .then((value) => {
            console.log(value);
            setLoading(false);
            enqueueSnackbar("đã đặt thành công, đang chờ xác nhận", {
              variant: "success",
            });
            navigate("/orders");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleChangeType = (val) => {
    setBookingType(val);
  };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  // const handleMouseOutFile = async (e) => {
  //   console.log(e.target.files[0]);
  //   const base64 = await convertBase64(e.target.files[0]);
  //   axios
  //     .post("http://localhost:5500/api/image/sendImageAndGetLink", { image: base64 })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  const handleSearchCustomer = () => {
    console.log("hello");
  };
  return (
    <BookingModalStyles>
      <form className="main__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="overlay" onClick={handleCloseForm}></div>
        <div className="modal__main">
          <div className="modal__title">
            <div className="title__container">
              <h4 className="title__text">Đặt Bàn</h4>
            </div>
          </div>
          <div className="modal__body">
            {/* {user?.LoaiTaiKhoan === 1 && ( */}
            <div className="general__infor customer__infor">
              <div className="group__title">Thông tin khách hàng</div>
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="size">
                      Số điện thoại
                    </label>
                  </div>
                  <div className="input__container phone__input__container">
                    <Input
                      className="input shared__place"
                      id="phone"
                      placeholder="0906461526"
                      type="text"
                      {...register("phone")}
                      autoComplete="off"
                      // width="auto"
                    />
                    <Button
                      padding="6px"
                      type="button"
                      bgColor={colors.orange_2}
                      bgHover={colors.orange_2_hover}
                      className="btn__search--phone"
                      onClick={handleSearchCustomer}
                    >
                      <i className="icon__search fa fa-search"></i>
                    </Button>
                  </div>
                  {errors?.phone && (
                    <div className="error__container">
                      <div className="error__message">{errors?.phone?.message}</div>
                    </div>
                  )}
                </div>
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="data">
                      Họ và tên
                    </label>
                  </div>
                  <div className="input__container">
                    <Input
                      type="fullname"
                      className="input"
                      autoComplete="off"
                      id="fullname"
                      {...register("fullname")}
                    />
                  </div>
                  {errors?.fullname && (
                    <div className="error__container">
                      <div className="error__message">{errors?.fullname?.message}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* )} */}
            <hr></hr>
            {/* <div className="input__container">
              <Input
                onMouseOut={handleMouseOutFile}
                className="input"
                id="size"
                placeholder="2"
                type="file"
                {...register("image")}
              />
            </div>
            {errors?.file && (
              <div className="error__container">
                <div className="error__message">{errors?.file?.message}</div>
              </div>
            )} */}
            <div className="general__infor">
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="size">
                      Số lượng người
                    </label>
                  </div>
                  <div className="input__container">
                    <Input
                      className="input"
                      id="size"
                      placeholder="2"
                      type="number"
                      min="1"
                      max="6"
                      {...register("size")}
                    />
                  </div>
                  {errors?.size && (
                    <div className="error__container">
                      <div className="error__message">{errors?.size?.message}</div>
                    </div>
                  )}
                </div>
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="data">
                      Ngày
                    </label>
                  </div>
                  <div className="input__container">
                    <Input type="date" className="input" id="date" {...register("date")} />
                  </div>
                  {errors?.date && (
                    <div className="error__container">
                      <div className="error__message">{errors?.date?.message}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="time">
                      Giờ Vào
                    </label>
                  </div>
                  <div className="input__container">
                    <Input type="time" className="input" id="time" {...register("time")} />
                  </div>
                  {errors?.time && (
                    <div className="error__container">
                      <div className="error__message">{errors?.time?.message}</div>
                    </div>
                  )}
                </div>
                <div className="value__container"></div>
              </div>
            </div>
            <div className="main__infor">
              <div className="type__tabs">
                <div
                  onClick={() => handleChangeType(true)}
                  className={`type__tab left ${bookingType ? "active" : ""}`}
                >
                  Bàn
                </div>
                <div
                  onClick={() => handleChangeType(false)}
                  className={`type__tab right ${bookingType ? "" : "active"}`}
                >
                  Phòng
                </div>
              </div>
              <div className="main__values">
                <div className="row__container">
                  {bookingType ? (
                    <div className="value__container">
                      <div className="label__container">
                        <label className="label">Ghi chú thêm</label>
                      </div>
                      <div className="input__container" htmlFor="note">
                        <TextArea
                          resize="none"
                          rows="3"
                          id="note"
                          className="input"
                          {...register("note")}
                        ></TextArea>
                      </div>
                    </div>
                  ) : (
                    <div className="value__container">
                      <div className="input__container radio__group">
                        <div className="radio__container">
                          <label htmlFor="kind-normal" className="radio__label">
                            Thường
                          </label>
                          <input
                            id="kind-normal"
                            className="input__radio"
                            value="0"
                            type="radio"
                            {...register("kind")}
                          />
                        </div>
                        <div className="radio__container">
                          <label htmlFor="kind-vip" className="radio__label">
                            VIP
                          </label>
                          <input
                            id="kind-vip"
                            className="input__radio"
                            value="1"
                            type="radio"
                            {...register("kind")}
                          />
                        </div>
                      </div>
                      {errors?.kind && (
                        <div className="error__container">
                          <div className="error__message">{errors?.kind?.message}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {!bookingType && (
                    <div className="value__container">
                      <div className="label__container">
                        <label className="label">Ghi chú thêm</label>
                      </div>
                      <div className="input__container" htmlFor="note">
                        <TextArea
                          {...register("note")}
                          resize="none"
                          rows="3"
                          id="note"
                          className="input"
                        ></TextArea>
                      </div>
                    </div>
                  )}
                  {/* <div className="value__container">
                    <div className="label__container">
                      <label className="label" htmlFor="duration">
                        Thời gian
                      </label>
                    </div>
                    <div className="input__container time__picker__container">
                      <Input
                        min={1}
                        max={6}
                        type="number"
                        className="input time__picker"
                        id="duration"
                        {...register("duration")}
                        placeholder="1"
                      />
                      <div className="additonal__tail">Giờ</div>
                    </div>
                    {errors?.duration && (
                      <div className="error__container">
                        <div className="error__message">{errors?.duration?.message} </div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <div className="btn__container">
              <Button
                disabled={loading}
                type="submit"
                bgColor={colors.orange_2}
                bgHover={colors.orange_2_hover}
                className="btn__confirm"
              >
                <div>Xác Nhận</div>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </BookingModalStyles>
  );
};

BookingModal.propTypes = {};

export default BookingModal;
