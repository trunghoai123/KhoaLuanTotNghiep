import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { colors, kinds } from "variables";
import axiosClient from "utils/axios";
import ReactPaginate from "react-paginate";
import { CaretLeft, CaretRight, CartPlus } from "react-bootstrap-icons";
import Search from "components/Search";
import BookingModal from "components/Modal/BookingModal";
import Cart from "components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCartById } from "store/cart/cartSlice";
import { useAuthContext } from "utils/context/AuthContext";
import { useFormStateContext } from "utils/context/FormStateContext";
const DishesStyles = styled.div`
  .top__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.light_gray_1};
    padding: 0px 40px 0px 30px;
  }
  .main__container {
    padding: 0px 40px;
    display: flex;
    column-gap: 14px;
    background-color: ${colors.light_gray_1};

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
      padding: 20px;
      flex: 1;
      background-color: white;
      /* height: 800px; */
      /* overflow-y: auto; */
      /* ::-webkit-scrollbar {
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
      } */
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
          margin-left: 10px;
          margin-right: 10px;
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
  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = () => setShowForm(false);
  const [dishes, setDishes] = useState();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const { user, updateAuthUser } = useAuthContext();
  const { openSignIn, setOpenSignIn, openSignUp, setOpenSignUp } = useFormStateContext();
  const handleShowModal = () => {
    // if (user) {
    setShowForm(true);
    // } else {
    //   setOpenSignIn(true);
    // }
  };
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let sum = 0;
      cartItems.forEach((item) => {
        sum += item.GiaMon * item.SoLuong;
        setTotal(sum);
      });
    }
  }, [cartItems]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDishes = async () => {
      try {
        const result = await axiosClient.get("menu/getAllMenu", {});
        if (result?.data?.data) {
          setDishes(result.data.data);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchDishes();
  }, []);
  const handleAddToCart = (e, id) => {
    e.preventDefault();
    dispatch(addToCartById(id)).then((data) => {});
  };
  return (
    <DishesStyles>
      {showForm && (
        <BookingModal cartItems={cartItems} handleCloseForm={handleCloseForm}></BookingModal>
      )}
      <div className="top__actions">
        <Search placeholder="Tìm Kiếm"></Search>
      </div>
      <div className="main__container">
        <Cart total={total} cartList={cartItems} handleShowModal={handleShowModal}></Cart>
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
                      <img
                        title={new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dish?.GiaMon)}
                        src={dish?.HinhAnh}
                        className="img"
                        alt={dish?.name}
                      />
                      <div className="overlay"></div>
                      <div
                        className="add__container"
                        onClick={(e) => handleAddToCart(e, dish?._id)}
                      >
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
            {dishes && (
              <ReactPaginate
                className="pagination__list"
                breakLabel="..."
                previousLabel={<CaretLeft></CaretLeft>}
                pageRangeDisplayed={5}
                nextLabel={<CaretRight></CaretRight>}
                pageCount={3}
                renderOnZeroPageCount={1}
              />
            )}
          </div>
        </div>
      </div>
    </DishesStyles>
  );
};

Dishes.propTypes = {};

export default Dishes;
