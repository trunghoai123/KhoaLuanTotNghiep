import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import React from "react";
import { colors } from "variables";
import styled from "styled-components";
const SignupFormStyles = styled.div`
  transition: all ease 200ms;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100vh;
  top: 0px;
  .main__form {
    transition: all ease 200ms;
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
      max-width: 650px;
      transition: all ease 200ms;
      border-radius: 6px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
        }
        .main__infor {
        }
      }
    }
  }
`;

const SignupForm = ({ handleCloseForm = () => {} }) => {
  return (
    <SignupFormStyles>
      <form className="main__form">
        <div className="overlay" onClick={handleCloseForm}></div>
        <div className="modal__main">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard className="mx-auto">
                <MDBCardBody className="px-5 w-100 d-flex flex-column">
                  <h2 className="fw-bold text-center">Đăng ký</h2>
                  <label htmlFor="username">Họ Tên</label>
                  <MDBInput wrapperClass="mb-4 w-100" id="fullname" type="text" size="md" />
                  <label htmlFor="username">Tài Khoản</label>
                  <MDBInput wrapperClass="mb-4 w-100" id="username" type="email" size="md" />
                  <label htmlFor="password">Mật Khẩu</label>
                  <MDBInput wrapperClass="mb-4 w-100" id="password" type="password" size="md" />
                  <label htmlFor="password">Xác Nhận Mật Khẩu</label>
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="retype-password"
                    type="retype-password"
                    size="md"
                  />

                  <MDBBtn size="md">Đăng nhập</MDBBtn>

                  <hr className="my-4" />

                  <MDBBtn className="mb-2 w-100" size="md" style={{ backgroundColor: "#dd4b39" }}>
                    <MDBIcon fab icon="google" className="mx-2" />
                    Đăng nhập với google
                  </MDBBtn>

                  <MDBBtn
                    className="mb-4 w-100"
                    size="md"
                    type="button"
                    style={{ backgroundColor: "#3b5998" }}
                  >
                    <MDBIcon fab icon="facebook-f" className="mx-2" />
                    Đăng nhập với facebook
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </form>
    </SignupFormStyles>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
