import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, dishes as dfDishes, kinds } from "variables";
import { Link } from "react-router-dom";
import axiosClient from "utils/api";

const DishesStyles = styled.div`
  .main__container {
    padding: calc(54px + 40px) 40px;
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
        height: 50%;
        flex-wrap: wrap;
        .dish {
          width: 25%;
          min-width: 200px;
          .dish__container {
            position: relative;
            padding: 10px;
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
            }
            .dish__name {
              width: 100%;
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
                    </div>
                    <div className="dish__name">{dish?.TenMon}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </DishesStyles>
  );
};

Dishes.propTypes = {};

export default Dishes;
