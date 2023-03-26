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
import React, { useContext } from "react";
import { colors } from "variables";
import styled from "styled-components";
import Button from "components/Button/Button";
import { useForm } from "react-hook-form";
import { AuthContext, useAuthContext } from "utils/context/AuthContext";
import { signIn } from "store/auth/authSlice";
import { enqueueSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useFormStateContext } from "utils/context/FormStateContext";
import { useNavigate } from "react-router-dom";
const LoginFormStyles = styled.div`
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
      .value__container {
        margin-bottom: 8px;
        position: relative;
        .error__message {
          width: 100%;
          color: red;
          font-size: 12px;
          position: absolute;
          bottom: -2px;
          left: 0;
        }
      }
      .modal__footer {
        padding: 20px 0 0 0;
        border-top: 1px solid ${colors.gray_1};
        .btn__container {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
`;
const schema = yup
  .object({
    email: yup
      .string("Hãy xem lại email")
      .required("Hãy nhập email")
      .email("Hãy xem lại địa chỉ Email"),
    password: yup
      .string("hãy xem lại mật khẩu")
      .min(8, "Mật khẩu yêu cầu ít nhất 8 ký tự")
      .required("Hãy nhập mật khẩu"),
  })
  .required();
const LoginForm = ({ handleCloseForm = () => {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid, isLoading, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "hoaitrung@gmail.com",
      password: "123123123",
    },
    resolver: yupResolver(schema),
  });
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const processedValue = {
      Email: values.email,
      MatKhau: values.password,
    };
    dispatch(signIn(processedValue))
      .then((data) => {
        if (data.error) {
          enqueueSnackbar("Không thể đăng nhập, tài khoản hoặc mật khẩu không chính xác", {
            variant: "warning",
          });
        } else {
          updateAuthUser(data.payload.account);
          handleCloseForm();
          if (data.payload.account.LoaiTaiKhoan === 1) {
            enqueueSnackbar("Đăng nhập thành công với quyền nhân viên", {
              variant: "success",
            });
            navigation("/admin");
          } else {
            enqueueSnackbar("Đăng nhập thành công", {
              variant: "success",
            });
          }
        }
      })
      .catch((err) => {
        console.log("error while create account");
      });
  };
  const { user, updateAuthUser } = useAuthContext();
  return (
    <LoginFormStyles>
      <form className="main__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="overlay" onClick={handleCloseForm}></div>
        <div className="modal__main">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard className="mx-auto">
                <MDBCardBody className="px-5 w-100 d-flex flex-column">
                  <h2 className="fw-bold text-center">Đăng nhập</h2>
                  <div className="value__container">
                    <label htmlFor="email">Tài Khoản</label>
                    <MDBInput
                      autoComplete="off"
                      wrapperClass="mb-3 w-100"
                      id="email"
                      type="text"
                      size="md"
                      name="email"
                      {...register("email")}
                    />
                    {errors?.email && (
                      <div className="error__message">{errors?.email?.message}</div>
                    )}
                  </div>
                  <div className="value__container">
                    <label htmlFor="password">Mật Khẩu</label>
                    <MDBInput
                      wrapperClass="mb-3 w-100"
                      name="password"
                      {...register("password")}
                      id="password"
                      type="password"
                      size="md"
                    />
                    {errors?.password && (
                      <div className="error__message">{errors?.password?.message}</div>
                    )}
                  </div>
                  <Button type="submit" bgHover={colors.orange_2_hover} bgColor={colors.orange_2}>
                    <div>Đăng Nhập</div>
                  </Button>

                  <hr className="my-4" />

                  <Button bgColor={colors.facebook} bgHover={colors.facebook_hover} type="button">
                    <div>
                      <MDBIcon fab icon="facebook-f" className="mx-2" />
                      Đăng nhập vằng Facebook
                    </div>
                  </Button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </form>
    </LoginFormStyles>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
