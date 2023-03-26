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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "store/auth/authSlice";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "utils/context/AuthContext";
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
    // fullname: yup.string("Hãy xem lại họ và tên").required("Hãy nhập họ và tên"),
    email: yup
      .string("Hãy xem lại email")
      .email("Hãy xem lại địa chỉ Email")
      .required("Hãy nhập email"),
    password: yup
      .string("hãy xem lại mật khẩu")
      .min(8, "Mật khẩu yêu cầu ít nhất 8 ký tự")
      .required("Hãy nhập mật khẩu"),
    retype_password: yup
      .string("hãy xem lại mật khẩu")
      .required("hãy nhập mật khẩu xác nhận")
      .test({
        name: "is-retyped",
        skipAbsent: true,
        test(value, ctx) {
          // console.log(value);
          // console.log(ctx.options.parent);
          if (!(value === ctx.options.parent.password)) {
            return ctx.createError({ message: "Mật khẩu xác nhận sai" });
          }
          return true;
        },
      }),
  })
  .required();
const SignupForm = ({ handleCloseForm = () => {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid, isLoading, isSubmitting },
  } = useForm({
    defaultValues: {
      // fullname: "trunghoai",
      email: "hoaitrung@gmail.com",
      password: "123123123",
      retype_password: "123123123",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { user, updateAuthUser } = useAuthContext();
  const onSubmit = (values) => {
    const processedValue = {
      Email: values.email,
      MatKhau: values.password,
      LoaiTaiKhoan: 0,
      TrangThai: 0,
    };
    dispatch(createAccount(processedValue))
      .then((data) => {
        if (data.error) {
          enqueueSnackbar("Tạo tài khoản không thành công, hãy kiểm tra lại email", {
            variant: "warning",
          });
        } else {
          enqueueSnackbar("Đã tạo tài khoản thành công", {
            variant: "success",
          });
          updateAuthUser(data.payload.account);
          handleCloseForm();
        }
      })
      .catch((err) => {
        console.log("error while create account");
      });
  };
  return (
    <SignupFormStyles>
      <form className="main__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="overlay" onClick={handleCloseForm}></div>
        <div className="modal__main">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard className="mx-auto">
                <MDBCardBody className="px-5 w-100 d-flex flex-column">
                  <h2 className="fw-bold text-center">Đăng ký</h2>
                  {/* <div className="value__container">
                    <label htmlFor="username">Họ Tên</label>
                    <MDBInput
                      {...register("fullname")}
                      wrapperClass="mb-3 w-100"
                      id="fullname"
                      type="text"
                      size="md"
                      name="fullname"
                      autoComplete="off"
                    />
                    {errors?.fullname && (
                      <div className="error__message">{errors?.fullname?.message}</div>
                    )}
                  </div> */}
                  <div className="value__container">
                    <label htmlFor="username">Email</label>
                    <MDBInput
                      size="md"
                      autoComplete="off"
                      wrapperClass="mb-3 w-100"
                      id="username"
                      type="text"
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
                  <div className="value__container">
                    <label htmlFor="retype_password">Xác Nhận Mật Khẩu</label>
                    <MDBInput
                      wrapperClass="mb-3 w-100"
                      id="retype_password"
                      type="password"
                      size="md"
                      name="retype_password"
                      {...register("retype_password")}
                    />
                    {errors?.retype_password && (
                      <div className="error__message">{errors?.retype_password?.message}</div>
                    )}
                  </div>
                  <Button type="submit" bgHover={colors.orange_2_hover} bgColor={colors.orange_2}>
                    <div>Đăng Ký</div>
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
    </SignupFormStyles>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
