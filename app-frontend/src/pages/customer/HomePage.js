import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { colors } from "../../variables";

const HomePageStyles = styled.div`
  padding-top: 54px;
  // ----- slider -----
  .slider {
    display: relative;
    .slide {
      img {
        height: calc(100vh - 53px);
        width: 100%;
        object-fit: cover;
      }
    }
    .logo__container {
      padding: calc(54px + 20px) 20px 20px 20px;
      position: absolute;
      top: 0px;
      right: 0px;
      .img__overlay {
        background-color: rgba(152, 152, 152, 0.4);
        border-radius: 50%;
        border: 2px solid white;
        .logo__img {
          width: 80px;
        }
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
          max-height: 400px;
          .service__link {
            height: 100%;
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
              height: 100%;
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
          <img src="images/home_banner.jpg" alt="slide"></img>
        </div>
        <div className="logo__container">
          <div className="img__overlay">
            <img className="logo__img" src="images/logo_transparent.png" alt="" />
          </div>
        </div>
      </div>
      <div className="section__all">
        <div className="all__main">
          <div className="service__row">
            <div className="service__item">
              <Link className="service__link" to={"/dishes"}>
                <img className="service__image" src={"images/home_1.jpg"} alt="" />
                <div className="service__frame"></div>
                <div className="service__title">Hẹn Hò</div>
              </Link>
            </div>
            <div className="service__item">
              <Link className="service__link" to={"/dishes"}>
                <img className="service__image" src={"images/home_2.jpeg"} alt="" />
                <div className="service__frame"></div>
                <div className="service__title">Lễ Chúc Mừng</div>
              </Link>
            </div>
          </div>
          <div className="service__row">
            <div className="service__item">
              <Link className="service__link" to={"/dishes"}>
                <img className="service__image" src={"images/home_3.jpg"} alt="" />
                <div className="service__frame"></div>
                <div className="service__title">Gặp Gỡ</div>
              </Link>
            </div>
            <div className="service__item">
              <Link className="service__link" to={"/dishes"}>
                <img className="service__image" src={"images/home_4.jpeg"} alt="" />
                <div className="service__frame"></div>
                <div className="service__title">Tiệc Thân Mật</div>
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
                Khám phá ngay những sảnh tiệc sang trọng và lịch lãm tại Evergreen Garden
              </div>
              <button className="left__button">Khám phá</button>
            </div>
            <div className="main__right">
              Evergreen Garden mang trên mình một lối kiến trúc hoàng gia sang trọng, mỗi góc tại
              cung điện mang vẻ đẹp khác nhau dành cho quan khách. Mỗi sảnh tiệc là một sự đầu tư
              bậc nhất về trang thiết bị, hệ thống âm thanh ánh sáng hiện đại và đội ngũ phục vụ
              chuyên nghiệp luôn đáp ứng trọn vẹn nhất các loại hình tiệc đẳng cấp khác nhau.
            </div>
          </div>
        </div>
      </div>
    </HomePageStyles>
  );
};

HomePage.propTypes = {};

export default HomePage;
