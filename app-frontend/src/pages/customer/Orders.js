import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";
import Search from "components/Search";
import Button from "components/Button/Button";
import ViewOrderDetailModal from "components/Modal/ViewOrderDetailModal";
import { getCustomerByUserId, getOneMenu, getOrderByUser, getOrderDetailByOrder } from "utils/api";
import { useAuthContext } from "utils/context/AuthContext";
import { getDishById } from "store/dish/dishSlice";
const OrdersStyles = styled.div`
  padding-top: 54px;
  .main__orders {
    background-color: ${colors.light_gray_1};
    padding: 30px 40px;
    .main__container {
      .state__tabs {
        .tabs__container {
          display: flex;
          background-color: white;
          .tab__item {
            padding: 14px 16px;
            cursor: pointer;
            width: 20%;
            transition: all ease 200ms;
            border-bottom: 2px solid ${colors.gray_1};
            :hover {
              color: ${colors.orange_2};
            }
            &.active {
              border-bottom: 2px solid ${colors.orange_2};
            }
            .item__text {
              text-align: center;
            }
          }
        }
      }
      .orders__container {
        .order__main {
          .main__table {
            margin-top: 30px;
            .table__head--container {
              .table__row {
                .table__head {
                  text-align: center;
                }
              }
            }
            .table__body {
              .table__row {
                .table__data {
                  width: 200px;
                  overflow-wrap: break-word;
                  text-align: center;
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
                    margin-bottom: 12px;
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
        }
      }
    }
  }
`;

const Orders = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const handleCloseForm = () => setShowForm(false);
  const handleViewOrderDetail = (id) => {};
  const { user } = useAuthContext();
  useEffect(() => {
    const getCustomer = async () => {
      if (user) {
        calculateTotalPrice("642866df1da55b0b5d28c7f4");
        const data = await getCustomerByUserId(user._id);
        if (data.data) {
          const customer = data.data;
          const orderList = await getOrderByUser(customer.MaTaiKhoan);
          if (orderList.data) {
            // const clonedList = [];
            // for (let i = 0; i < orderList.data.length; i++) {
            //   const totalPrice = await calculateTotalPrice(orderList.data[i]);
            //   console.log(totalPrice);
            //   clonedList.push({ ...orderList.data[i], total: totalPrice });

            //   console.log(totalPrice);
            // }
            // setOrders(clonedList);
            setOrders(orderList.data);
          }
        }
      }
    };
    getCustomer();
  }, [user]);
  const calculateTotalPrice = async (orderId) => {
    let dishes = [];
    let total = 0;
    try {
      const order = await getOrderDetailByOrder(orderId);
      console.log(order);
      const orderDetail = order.data[0];
      dishes = orderDetail.ListThucDon;
    } catch (error) {
      console.log(error);
    }
    // if (dishes !== null) {
    //   if (Array.isArray(dishes)) {
    //     for (let i = 0; i < dishes.length; i++) {
    //       // console.log(dishes[i].MaThucDon);
    //       console.log(dishes[i])
    //       const fetchedDish = await getOneMenu(dishes[i].MaThucDon);
    //       if (fetchedDish.data) {
    //         total += fetchedDish.data.GiaMon * dishes[i].SoLuong;
    //       // }
    //     }
    //   }
    // }
    return total;
  };
  return (
    <OrdersStyles>
      {showForm && <ViewOrderDetailModal handleCloseForm={handleCloseForm}></ViewOrderDetailModal>}
      <div className="main__orders">
        <Search placeHolder="Tìm Kiếm"></Search>
        <div className="main__container">
          <div className="state__tabs">
            <div className="tabs__container">
              <div className="tab__item active">
                <div className="item__text">Đang xử lý</div>
              </div>
              <div className="tab__item">
                <div className="item__text">Đang chờ đặt cọc</div>
              </div>
              <div className="tab__item">
                <div className="item__text">Đã thanh toán</div>
              </div>
              <div className="tab__item">
                <div className="item__text">Đã nhận</div>
              </div>
              <div className="tab__item">
                <div className="item__text">Đã hủy</div>
              </div>
            </div>
          </div>
          <div className="orders__container">
            <div className="order__main">
              <table className="main__table table table-striped">
                <thead className="table__head--container">
                  <tr className="table__row">
                    <th className="table__head item__id" scope="col">
                      Mã phiếu đặt
                    </th>
                    <th className="table__head" scope="col">
                      Thời gian đặt
                    </th>
                    <th className="table__head" scope="col">
                      Thời gian đến
                    </th>
                    {/* <th className="table__head" scope="col">
                      Số tiền cần đặt cọc
                    </th>
                    <th className="table__head" scope="col">
                      Tổng tiền món ăn
                    </th> */}
                  </tr>
                </thead>
                <tbody className="table__body">
                  {orders.map((order) => {
                    // const total = calculateTotalPrice(order?._id);
                    return (
                      <tr className="table__row" key={order._id}>
                        <td className="table__data item__id">
                          {order._id.substring(0, 6) + "..."}
                        </td>
                        <td className="table__data">
                          {new Date(order.createdAt).getHours() +
                            ":" +
                            new Date(order.createdAt).getMinutes() +
                            " - " +
                            new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="table__data">
                          {new Date(order.ThoiGianBatDau).getHours() +
                            ":" +
                            new Date(order.ThoiGianBatDau).getMinutes() +
                            " - " +
                            new Date(order.ThoiGianBatDau).toLocaleDateString()}
                        </td>
                        <td className="table__data">
                          <Button
                            className="button button__remove"
                            bgHover={colors.green_1}
                            bgColor={colors.green_1_hover}
                            onClick={() => handleViewOrderDetail("hello")}
                          >
                            <div>
                              <span className="text">Xem</span>
                              <i className="icon__item fa fa-eye" aria-hidden="true"></i>
                            </div>
                          </Button>
                          <Button
                            className="button button__remove"
                            bgHover={colors.red_1_hover}
                            bgColor={colors.red_1}
                          >
                            <div>
                              <span className="text">Hủy</span>
                              <i className="icon__item fa-solid fa-trash-can"></i>
                            </div>
                          </Button>
                          <Button className="button button__payment" disabled>
                            <div>
                              <span className="text">Thanh toán cọc</span>
                              <i className="icon__item fa-regular fa-credit-card"></i>
                            </div>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OrdersStyles>
  );
};

Orders.propTypes = {};

export default Orders;
