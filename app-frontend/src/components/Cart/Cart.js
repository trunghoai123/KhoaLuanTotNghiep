import React, { useState } from "react";
import PropTypes from "prop-types";
import { CartFill, CheckLg } from "react-bootstrap-icons";
import Button from "components/Button/Button";
import { colors } from "variables";
import styled from "styled-components";
import { createCart } from "store/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormStateContext } from "utils/context/FormStateContext";
const CartStyles = styled.div`
  position: relative;
  z-index: 10;
  top: calc(54px + 30px);
  position: fixed;
  right: 0px;
  color: white;
  width: 46px;
  height: 46px;
  svg {
    font-size: 30px;
  }
  .cart__list__container {
    position: absolute;
    top: 100%;
    right: 0;
    width: 260px;
    /* height: 430px; */
    padding: 6px;
    background-color: ${colors.gold_1};
    transition: all ease 200ms;
    transform: translateX(260px);

    .cart__title {
      padding-bottom: 6px;
      text-align: center;
      border-bottom: 1px solid white;
    }
    .cart__list {
      padding: 12px 0px;
      overflow-y: auto;
      /* height: 80%; */
      max-height: 320px;
      ::-webkit-scrollbar {
        width: 3px;
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
      .cart__item {
        position: relative;
        margin-bottom: 12px;
        width: 100%;
        height: 50px;
        display: flex;
        .remove {
          top: 0px;
          right: 2px;
          position: absolute;
          :hover {
            color: red;
            cursor: pointer;
          }
        }
        .img__container {
          height: 100%;
          .img__dish {
            width: 60px;
            height: 100%;
            /* height: 40px; */
            object-fit: cover;
          }
        }
        .infor__container {
          display: flex;
          justify-content: space-between;
          .name__container {
            padding: 4px 4px 4px 6px;
            font-size: 15px;
            width: 130px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .quant__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            margin-left: auto;
            .mark__container {
              border: 1px solid ${colors.light_gray_1};
              .update__quant {
                cursor: pointer;
                padding: 0 4px;
                display: inline-block;
                /* display: flex;
                    justify-content: center; */
                /* align-items: center; */
                :nth-child(2) {
                  border-left: 1px solid ${colors.light_gray_1};
                }
                i {
                  font-size: 11px;
                }
              }
            }
            .quantity {
              font-size: 13px;
              width: 35px;
              outline: none;
              text-align: center;
            }
          }
        }
      }
    }
    .btn__container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      .btn_booking {
      }
    }
  }
  :hover {
    .cart__list__container {
      box-shadow: -3px 8px 8px rgba(0, 0, 0, 0.3);
      transform: translateX(0px);
    }
  }
  .cart__logo__container {
    position: relative;
    background-color: ${colors.orange_2};
    color: white;
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease 150ms;
    margin-left: auto;
    transition: all ease 150ms;
    .ammount {
      position: absolute;
      top: -5px;
      left: -5px;
      padding: 11px;
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: red;
      border-radius: 50%;
    }
  }
`;

const Cart = ({ handleShowModal = () => {}, cartList = [], total = 0 }) => {
  return (
    <CartStyles>
      <div className="cart__logo__container">
        <CartFill></CartFill>
        <div className="ammount">{cartList.length}</div>
      </div>
      <div className="cart__list__container">
        <div className="cart__title">Giỏ Hàng</div>
        <div className="cart__list">
          {cartList &&
            cartList.map((item, index) => {
              return (
                <div className="cart__item" key={index}>
                  <span className="remove">
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                  <div className="img__container">
                    <img className="img__dish" src={item.HinhAnh} alt="" />
                  </div>
                  <div className="infor__container">
                    <div className="name__container">{item.TenMon}</div>
                    <div className="quant__container">
                      <div className="mark__container">
                        <span className="update__quant">
                          <i className="fa-solid fa-minus"></i>
                        </span>
                        <span className="update__quant">
                          <i className="fa-solid fa-plus"></i>
                        </span>
                      </div>
                      <input
                        onChange={() => {}}
                        className="quantity"
                        type="text"
                        value={item.SoLuong}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="sum__container">
          Tổng tiền:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total)}
        </div>
        <div className="btn__container">
          <Button
            bgColor={colors.orange_2}
            bgHover={colors.orange_2_hover}
            className="btn_booking"
            onClick={handleShowModal}
          >
            <div>Đặt Bàn</div>
          </Button>
        </div>
      </div>
    </CartStyles>
  );
};

Cart.propTypes = {};

export default Cart;
