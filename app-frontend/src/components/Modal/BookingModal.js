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
import axiosClient from "utils/api";
import { getDishById } from "store/dish/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "store/order/orderSlice";
const BookingModalStyles = styled.div`
  transition: all ease 200ms;
  position: fixed;
  z-index: 99999;
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
          .row__container {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            column-gap: 20px;
            .value__container {
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
                .input__text {
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
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            column-gap: 20px;
            .value__container {
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
            }
          }
        }
      }
    }
  }
`;

const schema = yup
  .object({
    size: yup.number().required().min(1).integer(),
    time: yup.string().required(),
    date: yup.string().required(),
    kind: yup.string().required(),
    duration: yup.number().min(1).max(6).required(),
    note: yup.string(),
  })
  .required();
const BookingModal = ({ handleCloseForm = () => {}, cartItems = [] }) => {
  const dispatch = useDispatch();
  const [bookingType, setBookingType] = useState();
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const result = await axiosClient.get("order/getAllOrder", {});
        // console.log(new Date(result.data.data[0].createdAt));
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchDishes();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      size: 2,
      time: "07:43",
      date: "2023-03-15",
      kind: "normal",
      duration: 1,
      note: "hello guys",
    },
    resolver: yupResolver(schema),
  });
  getValues();
  // const { cartItems } = useSelector((state) => state.cart);
  const onSubmit = (data) => {
    if (isValid) {
      const { size, duration, date, time, kind, note } = data;
      const startAt = createDateValue(data);
      const endAt = createDateValue(data, duration);
      // dispatch(getDishById("640d7988cdbba62a71d877e4")).then((data) => {});
      const order = {
        LoaiPhieuDat: 0,
        TrangThai: 0,
        SoLuongNguoi: size,
        ThoiGianBatDau: startAt,
        ThoiGianKetThuc: endAt,
        MaKhachHang: "64157b0f4841a550c1562a0a",
        ListThucDon: [cartItems],
        ListPhong: null,
        ListBan: null,
      };
      dispatch(addOrder(order));
    }
  };

  const createDateValue = (data, plusHour = 0) => {
    const { date, time } = data;
    const separatedDate = date.split("-");
    const separatedTime = time.split(":");
    separatedTime[0] = separatedTime[0] + plusHour;
    return new Date(
      separatedDate[0],
      separatedDate[1],
      separatedDate[2],
      separatedTime[0],
      separatedTime[1]
    );
  };
  const handleChangeType = (val) => {
    setBookingType(val);
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
                      {...register("size")}
                    />
                  </div>
                </div>
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="data">
                      Ngày
                    </label>
                  </div>
                  <div className="input__container">
                    <Input
                      type="date"
                      className="input"
                      id="date"
                      {...register("date")}
                    />
                  </div>
                </div>
              </div>
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="time">
                      Giờ
                    </label>
                  </div>
                  <div className="input__container">
                    <Input
                      type="time"
                      className="input"
                      id="time"
                      {...register("time")}
                    />
                  </div>
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
                      <div className="label__container">
                        <label className="label" htmlFor="duration">
                          Phòng
                        </label>
                      </div>
                      <div className="input__container radio__group">
                        <div className="radio__container">
                          <label htmlFor="kind-normal" className="radio__label">
                            Thường
                          </label>
                          <input
                            id="kind-normal"
                            className="input__radio"
                            value="normal"
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
                            value="vip"
                            type="radio"
                            {...register("kind")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="value__container">
                    <div className="label__container">
                      <label className="label" htmlFor="duration">
                        Thời gian
                      </label>
                    </div>
                    <div className="input__container time__picker__container">
                      <Input
                        type="number"
                        className="input time__picker"
                        id="duration"
                        {...register("duration")}
                        placeholder="1"
                      />
                      <div className="additonal__tail">Giờ</div>
                    </div>
                  </div>
                </div>
                {!bookingType && (
                  <div className="row__container">
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
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <div className="btn__container">
              <Button
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
