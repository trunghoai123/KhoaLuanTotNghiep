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
import Input from "components/Input/Input";
import TextArea from "components/TextArea/TextArea";
import { convertBase64 } from "utils/utils";
import axios from "axios";
import { uploadImage } from "utils/api";
import { useState } from "react";
const AreaUpdateFormStyles = styled.div`
  transition: all ease 200ms;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100vh;
  top: 0px;
  .main__form {
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
      transition: all ease 200ms;
      border-radius: 6px;
      padding: 20px 5px 20px 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
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
          .group__title {
            padding-bottom: 20px;
            text-align: center;
            border-top: 1px solid lightgray;
          }
          .row__container {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            column-gap: 20px;
            .value__container {
              align-self: start;
              position: relative;
              width: 50%;
              .label__container {
                padding-bottom: 6px;
                min-width: 20%;
                .label {
                }
              }
              .input__container {
                &.img__file__container {
                  input[type="file"] {
                    cursor: pointer;
                  }
                  position: relative;
                  .label__upload {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    left: 90px;
                    font-size: 30px;
                    transform: translate(-50%, -50%);
                    color: white;
                  }
                }
                &.phone__input__container {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  column-gap: 12px;
                  .shared__place {
                    /* width: auto; */
                    /* flex: 1; */
                  }
                  .btn__search--phone {
                    /* margin-left: auto; */
                  }
                }
                &.time__picker__container {
                  position: relative;
                  display: flex;
                  align-items: center;
                  .time__picker {
                    padding-right: 60px;
                  }
                  .additonal__tail {
                    padding-left: 20px;
                    flex: 1;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                  }
                }
                .input__text {
                }
              }
              .error__container {
                position: absolute;
                bottom: -20px;
                left: 0px;
                color: red;
                font-size: 13px;
                .error__message {
                }
              }
            }
          }
        }
      }
    }
  }
`;

// const schema = yup
//   .object({
//     phone: yup
//       .string("hãy xem lại số điện thoại")
//       .matches(/[0][0-9][0-9]{8}/, "hãy nhập đúng định dạng số điện thoại")
//       .required("hãy nhập số lượng"),
//     fullname: yup
//       .string("hãy xem lại họ tên")
//       .matches(
//         /^(([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\s\'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]))*$/,
//         "hãy kiểm tra lại họ tên"
//       )
//       .required("hãy nhập họ tên"),
//     size: yup.string("hãy xem lại số lượng").required("hãy nhập số lượng"),
//     time: yup.string("hãy xem lại thời gian").required("hãy nhập thời gian"),
//     date: yup.string("hãy xem lại ngày").required("hãy chọn ngày"),
//     kind: yup.string("hãy xem lại loại").required("hãy chọn loại"),
//     duration: yup.string("hãy xem lại thời gian").required("hãy nhập thời gian"),
//     note: yup.string(),
//     // image: yup.string().required(),
//   })
//   .required();
const AreaUpdateForm = ({ handleCloseForm = () => {}, mode }) => {
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
    //   resolver: yupResolver(schema),
  });
  const [imageSelecting, setImageSelecting] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values) => {};
  const handleChangeImage = async (e) => {
    const base64 = await convertBase64(e.target.files[0]);
    console.log(base64);
    uploadImage(base64).then((image) => {
      console.log(image);
      setImageSelecting(image.data);
    });
  };
  const { user, updateAuthUser } = useAuthContext();
  return (
    <AreaUpdateFormStyles>
      <form className="main__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="overlay" onClick={handleCloseForm}></div>
        <div className="modal__main">
          <div className="modal__title">
            <div className="title__container">
              <h4 className="title__text">Đặt Bàn</h4>
            </div>
          </div>
          <div className="modal__body">
            <div className="general__infor">
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="size">
                      Mã
                    </label>
                  </div>
                  <div className="input__container">
                    <Input
                      className="input"
                      id="id"
                      placeholder="A1"
                      type="text"
                      autoComplete="off"
                      {...register("id")}
                    />
                  </div>
                  {errors?.id && (
                    <div className="error__container">
                      <div className="error__message">{errors?.id?.message}</div>
                    </div>
                  )}
                </div>
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="data">
                      Tên
                    </label>
                  </div>
                  <div className="input__container">
                    <Input
                      autoComplete="off"
                      type="text"
                      placeholder="Khu Vực Tiếp Đón"
                      className="input"
                      id="name"
                      {...register("name")}
                    />
                  </div>
                  {errors?.name && (
                    <div className="error__container">
                      <div className="error__message">{errors?.name?.message}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="time">
                      Hình ảnh
                    </label>
                  </div>
                  <div className="input__container img__file__container">
                    <label className="label__upload" htmlFor="image">
                      <i className="fa-solid fa-upload"></i>
                    </label>
                    <Input
                      width="180px"
                      isImgFile={true}
                      type="file"
                      imgUrl={imageSelecting}
                      className="input"
                      id="image"
                      onChange={handleChangeImage}
                      {...register("image", {
                        onChange: (e) => handleChangeImage(e),
                      })}
                    />
                  </div>
                  {errors?.image && (
                    <div className="error__container">
                      <div className="error__message">{errors?.image?.message}</div>
                    </div>
                  )}
                </div>
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="time">
                      Vị trí cụ thế
                    </label>
                  </div>
                  <div className="input__container">
                    <TextArea
                      resize="none"
                      className="input"
                      id="detail"
                      {...register("detail")}
                    ></TextArea>
                  </div>
                  {errors?.detail && (
                    <div className="error__container">
                      <div className="error__message">{errors?.detail?.message}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row__container">
                <div className="value__container">
                  <div className="label__container">
                    <label className="label" htmlFor="time">
                      Mô tả
                    </label>
                  </div>
                  <div className="input__container">
                    <TextArea
                      className="input"
                      id="description"
                      {...register("description")}
                      resize="none"
                    ></TextArea>
                  </div>
                  {errors?.description && (
                    <div className="error__container">
                      <div className="error__message">{errors?.description?.message}</div>
                    </div>
                  )}
                </div>
                <div className="value__container"></div>
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <div className="btn__container">
              <Button
                type="submit"
                bgColor={colors.orange_2}
                bgHover={colors.orange_2_hover}
                className="btn__confirm"
              >
                <div>Xác Nhận</div>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AreaUpdateFormStyles>
  );
};

AreaUpdateForm.propTypes = {};

export default AreaUpdateForm;
