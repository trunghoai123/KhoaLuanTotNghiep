import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { colors } from "variables";

const HomePageStyles = styled.div`
  padding-top: 54px;
  // ----- slider -----
  .slider {
    .slide {
      img {
        height: calc(100vh - 53px);
        width: 100%;
        object-fit: cover;
      }
    }
  }
  // -------- section --------
  .section__all {
    padding: 40px 0;
    .all__main {
      .service__row {
        display: flex;
        .service__item {
          width: 50%;
          .service__link {
            .service__title {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              padding: 10px 0px 14px 0px;
              background-color: rgba(189, 128, 25, 0.6);
              text-align: center;
              font-size: 26px;
              font-weight: 500;
            }
            position: relative;
            color: white;
            text-decoration: none;
            .service__image {
              width: 100%;
            }
            .service__frame {
              z-index: 2;
              margin: 10px;
              border: 2px solid white;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
  .section__discovery {
    .discovery {
      .service__title {
        display: flex;
        justify-content: center;
        font-size: 30px;
        color: ${colors.brown_shadow};
        font-weight: 500;
        .title__text {
          text-align: center;
          border-bottom: 1px solid ${colors.brown_shadow};
          width: 30%;
          padding: 0 0 14px 0;
        }
      }
      .service__main {
        padding: 36px 0px 36px 0px;
        display: flex;
        .main__left {
          padding-left: 80px;
          width: 50%;
          .left__intro {
          }
          .left__button {
            border-radius: 4px;
            border: none;
            color: white;
            padding: 4px 22px 4px 22px;
            cursor: pointer;
            outline: none;
            margin-top: 20px;
            background-color: ${colors.gold_1};
          }
        }
        .main__right {
          padding-right: 80px;
          width: 50%;
        }
      }
    }
  }
`;
const HomePage = (props) => {
  return (
    <HomePageStyles>
      <div className="slider">
        <div className="slide">
          <img
            src="https://luxurypalace.vn/wp-content/uploads/2022/01/banner-dang-cap.png"
            alt="slide"
          ></img>
        </div>
      </div>
      <div className="section__all">
        <div className="all__main">
          <div className="service__row">
            <div className="service__item">
              <Link className="service__link" to={"/service/conference"}>
                <img
                  className="service__image"
                  src="https://luxurypalace.vn/wp-content/uploads/2019/10/service-1-398x176.png"
                  alt=""
                />
                <div className="service__frame"></div>
                <div className="service__title">Conference</div>
              </Link>
            </div>
            <div className="service__item">
              <Link className="service__link" to={"/service/conference"}>
                <img
                  className="service__image"
                  src="https://luxurypalace.vn/wp-content/uploads/2019/12/tiec-cuoi-398x176.jpg"
                  alt=""
                />
                <div className="service__frame"></div>
                <div className="service__title">Wedding</div>
              </Link>
            </div>
          </div>
          <div className="service__row">
            <div className="service__item">
              <Link className="service__link" to={"/service/conference"}>
                <img
                  className="service__image"
                  src="https://luxurypalace.vn/wp-content/uploads/2019/12/outsize-398x176.jpg"
                  alt=""
                />
                <div className="service__frame"></div>
                <div className="service__title">Outside</div>
              </Link>
            </div>
            <div className="service__item">
              <Link className="service__link" to={"/service/conference"}>
                <img
                  className="service__image"
                  src="https://luxurypalace.vn/wp-content/uploads/2019/12/event-398x176.jpg"
                  alt=""
                />
                <div className="service__frame"></div>
                <div className="service__title">Event</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section__discovery">
        <div className="discovery">
          <div className="service__title">
            <div className="title__text">DISCOVERY</div>
          </div>
          <div className="service__main">
            <div className="main__left">
              <div className="left__intro">
                Khám phá ngay những sảnh tiệc sang trọng và lịch lãm tại GOLDEN
                BARN
              </div>
              <button className="left__button">Discover now</button>
            </div>
            <div className="main__right">
              GOLDEN BARN mang trên mình một lối kiến trúc hoàng gia sang trọng,
              mỗi góc tại cung điện mang vẻ đẹp khác nhau dành cho quan khách.
              Mỗi sảnh tiệc là một sự đầu tư bậc nhất về trang thiết bị, hệ
              thống âm thanh ánh sáng hiện đại và đội ngũ phục vụ chuyên nghiệp
              luôn đáp ứng trọn vẹn nhất các loại hình tiệc đẳng cấp khác nhau.
            </div>
          </div>
        </div>
      </div>
    </HomePageStyles>
  );
};

HomePage.propTypes = {};

export default HomePage;
