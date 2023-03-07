import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "variables";

const BookingStyles = styled.div`
  padding: 54px 0px 0px 0px;
  .main__image {
    height: 400px;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("https://luxurypalace.vn/wp-content/uploads/2019/12/1I7A5559-scaled.jpg");
    position: relative;
    .overlay {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .heading__title {
      bottom: 50%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      text-align: center;
      color: white;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 2px;
    }
  }
  .main__section {
    padding: 40px;
    .lobbies {
      display: flex;
      column-gap: 50px;
      .lobby__selection {
        .lobby__option {
          width: 250px;
          text-align: center;
          padding: 16px 0px 16px 0px;
          border: 2px solid ${colors.gold_1};
          margin-bottom: 10px;
          user-select: none;
          cursor: pointer;
          :hover {
            background-color: ${colors.gold_1};
            color: white;
            transition: all ease 300ms;
          }
        }
      }
      .lobby__slides {
        flex: 1;
        .lobby__item {
          height: 400px;
          .lobby__image {
            height: 100%;
            width: 100%;
            .lobby__img {
              max-height: 100%;
              object-fit: cover;
              width: 100%;
            }
          }
        }
      }
    }
    .lobby__details {
      padding: 40px;
      .lobby__name {
        font-size: 28px;
        color: ${colors.gold_1};
        margin-bottom: 20px;
      }
    }
    .button__container {
      display: flex;
      justify-content: center;
      .btn__lobby {
      }
    }
  }
`;
const Booking = (props) => {
  return (
    <BookingStyles>
      <div className="main__image">
        <div className="overlay"></div>
        <div className="heading__title">BOOKING</div>
      </div>
      <div className="main__section">
        <div className="lobbies">
          <div className="lobby__selection">
            <div className="lobby__option">PLATINUM LOBBY</div>
            <div className="lobby__option">DIAMOND LOBBY</div>
            <div className="lobby__option">MERCURY LOBBY</div>
            <div className="lobby__option">VENUS LOBBY</div>
            <div className="lobby__option">GOLDEN LOBBY</div>
            <div className="lobby__option">RUBY LOBBY</div>
          </div>
          <div className="lobby__slides">
            <div className="lobby__item">
              <div className="lobby__image">
                <img
                  className="lobby__img"
                  src="https://grandpalace.com.vn/multidata/lnom1633.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lobby__details">
          <div className="lobby__name">PLATINUM LOBBY</div>
          Platinum is the most large lobby in my restaurant, this lobby has
          capacity up to 1500 persons. The banquet hall will bring you the most
          epic party, whether it's a wedding, conference or other event, we will
          give you an unprecedented feeling.
        </div>
        <div className="button__container">
          <button className="btn__lobby">Choose This Lobby</button>
        </div>
      </div>
    </BookingStyles>
  );
};

Booking.propTypes = {};

export default Booking;
