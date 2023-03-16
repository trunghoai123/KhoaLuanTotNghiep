import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, dishes as dfDishes, kinds } from "variables";
import axiosClient from "utils/api";
import ReactPaginate from "react-paginate";
import {
  ArrowLeft,
  BoxArrowInLeft,
  BoxArrowLeft,
  CaretLeft,
  CaretRight,
  Cart,
  CartFill,
  CartPlus,
  NodeMinus,
  PatchMinus,
  ShieldMinus,
  Subtract,
} from "react-bootstrap-icons";
import Button from "components/Button";

const DishesStyles = styled.div`
  .main__container {
    padding: calc(54px + 40px) 40px;
    display: flex;
    column-gap: 14px;
    background-color: ${colors.light_gray_1};
    .cart__container {
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
        height: 430px;
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
          height: 80%;
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
      }
    }
    .left__container {
      width: 300px;
      background-color: white;
      height: 800px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 10px;
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
      .filter__kind {
        padding: 20px;
        column-count: 2;
        column-gap: 10px;
        .kind__container {
          margin-bottom: 10px;
          border: solid 2px ${colors.gray_1};
          padding: 4px;
          :hover {
            border: solid 2px ${colors.gold_1};
            transition: all ease 150ms;
          }
          .kind__item {
            position: relative;
            cursor: pointer;
            :hover {
              .kind__item--name {
                color: ${colors.gold_1};
                transition: all ease 150ms;
              }
            }
            .kind__image {
              width: 100%;
              height: 60px;
              object-fit: cover;
            }
            .kind__item--name {
              position: absolute;
              text-align: center;
              color: white;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 1;
            }
            .overlay {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              top: 0;
              background-color: rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }
    .right__container {
      height: 800px;
      padding: 20px;
      flex: 1;
      background-color: white;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 10px;
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
      .dishes__container {
        display: flex;
        flex-wrap: wrap;
        .dish {
          width: 25%;
          min-width: 200px;
          .dish__container {
            position: relative;
            padding: 10px;
            :hover {
              transform: translateY(-6px);
              transition: all ease 150ms;
            }
            .img__container {
              overflow: hidden;
              position: relative;
              .img {
                object-fit: cover;
                height: 180px;
                width: 100%;
              }
              .overlay {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 0px;
                box-shadow: 0px 0px 60px 35px black;
              }
              .add__container {
                padding: 6px;
                background-color: ${colors.orange_2};
                position: absolute;
                top: 0px;
                right: 0px;
                transition: all ease 150ms;
                :hover {
                  background-color: ${colors.orange_2_hover};
                }
                .icon__add {
                  color: white;
                }
              }
            }
            .dish__name {
              width: calc(100% - 20px);
              padding: 2px;
              color: white;
              position: absolute;
              bottom: 10px;
              left: 10px;
              text-align: center;
            }
          }
        }
      }
      .pagination__container {
        .pagination__list {
          background-color: ${colors.orange_1};
          padding: 8px;
          /* margin-right: auto;
          margin-left: auto; */
          display: flex;
          justify-content: center;
          align-items: center;
          > li {
            border-radius: 4px;
            list-style-type: none;
            color: white;
            font-weight: 500;
            /* display: flex;
            align-items: center; */
            > a {
              display: flex;
              justify-content: center;
              transition: all ease 150ms;
              align-items: center;
              height: 40px;
              width: 34px;
              display: inline-block;
              display: flex;
              align-items: center;
              :hover {
                background-color: ${colors.light_gray_1};
                color: ${colors.gold_1};
              }
            }
          }
        }
      }
    }
  }
`;

const Dishes = (props) => {
  const [dishes, setDishes] = useState();
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const result = await axiosClient.get("menu/getAllMenu", {});
        if (result?.data?.data) {
          console.log(result);
          setDishes(result.data.data);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchDishes();
  }, []);
  return (
    <DishesStyles>
      <div className="main__container">
        <div className="cart__container">
          <div className="cart__logo__container">
            <CartFill></CartFill>
          </div>
          <div className="cart__list__container">
            <div className="cart__title">Giỏ Hàng</div>
            <div className="cart__list">
              {new Array(7).fill(0).map(() => {
                return (
                  <div className="cart__item">
                    <span className="remove">
                      <i class="fa-solid fa-xmark"></i>
                    </span>
                    <div className="img__container">
                      <img
                        className="img__dish"
                        src="https://product.hstatic.net/1000093072/product/lau_vit_nau_chao_1_a0e8c1af4378441f80fe8ffa7b03994b_large_08a9b3be87fb4a18aabd5701fb0ca8f4_master.jpg"
                        alt=""
                      />
                    </div>
                    <div className="infor__container">
                      <div className="name__container">
                        Lẩu vịt nấu chao Lẩu vịt nấu chao Lẩu vịt nấu chao Lẩu vịt nấu chao Lẩu vịt
                        nấu chao
                      </div>
                      <div className="quant__container">
                        <div className="mark__container">
                          <span className="update__quant">
                            <i class="fa-solid fa-minus"></i>
                          </span>
                          <span className="update__quant">
                            <i class="fa-solid fa-plus"></i>
                          </span>
                        </div>
                        <input className="quantity" type="text" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="btn__container">
              <Button
                bgColor={colors.orange_2}
                bgHover={colors.orange_2_hover}
                className="btn_booking"
              >
                Đặt Bàn
              </Button>
            </div>
          </div>
        </div>
        <div className="left__container">
          <div className="filter__kind">
            {kinds.map((kind) => {
              return (
                <div key={kind?.id} className="kind__container">
                  <div className="kind__item">
                    <img src={kind.imageUrl} className="kind__image" alt="" />
                    <div className="kind__item--name">Món {kind.name}</div>
                    <div className="overlay"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="right__container">
          <div className="dishes__container">
            {dishes?.map((dish) => {
              return (
                <Link to={`/dish/${dish?._id}`} key={dish?._id} className="dish">
                  <div className="dish__container">
                    <div className="img__container">
                      <img src={dish?.HinhAnh} className="img" alt={dish?.name} />
                      <div className="overlay"></div>
                      <div className="add__container">
                        <CartPlus className="icon__add"></CartPlus>
                      </div>
                    </div>
                    <div className="dish__name">{dish?.TenMon}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pagination__container">
            <ReactPaginate
              className="pagination__list"
              breakLabel="..."
              previousLabel={<CaretLeft></CaretLeft>}
              pageRangeDisplayed={5}
              nextLabel={<CaretRight></CaretRight>}
              pageCount={3}
              renderOnZeroPageCount={1}
            />
          </div>
        </div>
      </div>
    </DishesStyles>
  );
};

Dishes.propTypes = {};

export default Dishes;
