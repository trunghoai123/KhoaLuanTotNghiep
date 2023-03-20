import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";
import Search from "components/Search";
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
    }
  }
`;

const Orders = (props) => {
  return (
    <OrdersStyles>
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
          <div className=""></div>
        </div>
      </div>
    </OrdersStyles>
  );
};

Orders.propTypes = {};

export default Orders;
