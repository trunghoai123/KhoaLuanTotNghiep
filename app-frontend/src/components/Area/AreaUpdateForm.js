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
import { addNewArea, getAreaByAreaId, getAreaById, updateArea, uploadImage } from "utils/api";
import { useState } from "react";
import { useEffect } from "react";
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
                  position: relative;
                  input[type="file"] {
                    cursor: pointer;
                  }
                  .label__upload {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    left: 90px;
                    font-size: 22px;
                    text-align: center;
                    transform: translate(-50%, -50%);
                    color: black;
                    background-color: rgba(0, 0, 0, 0.15);
                    padding: 10px;
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
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

const AreaUpdateForm = ({ handleCloseForm = () => {}, mode, setMode }) => {
  const schema = yup
    .object({
      id: yup.string("hãy xem lại mã").test({
        name: "check-id",
        skipAbsent: true,
        test(value, ctx) {
          if (mode.mode === 2) {
            if (value.trim() === "") {
              return ctx.createError({ message: "hãy nhập mã" });
            }
          }
          return true;
        },
      }),
      name: yup.string("hãy xem lại tên").required("hãy nhập tên"),
      detail: yup.string("hãy xem lại chi tiết").required("hãy nhập vị trí cụ thể"),
      description: yup.string("hãy xem lại mô tả").required("hãy nhập mô tả"),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // email: "hoaitrung@gmail.com",
      // password: "123123123",
    },
    resolver: yupResolver(schema),
  });
  const [currentArea, setCurrentArea] = useState(null);
  const [imageSelecting, setImageSelecting] = useState("");
  useEffect(() => {
    if (mode.mode === 1) {
      const loadAreaOnUpdate = async () => {
        try {
          const data = await getAreaById(mode.id);
          const area = data.data;
          setCurrentArea(area);
          if (area) {
            setValue("id", area.MaKhuVuc);
            setValue("name", area.TenKhuVuc);
            setValue("description", area.MoTa);
            setValue("detail", area.ViTriCuThe);
            setImageSelecting(area.HinhAnh);
            setIsLoadedImage(true);
          } else {
          }
        } catch (error) {
          console.log(error);
          return;
        }
      };
      loadAreaOnUpdate();
    }
  }, []);
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const onSubmit = async (values) => {
    if (!isLoadedImage) {
      setError("image", { type: "required", message: "Hãy chọn ảnh" });
    } else {
      clearErrors("image");
      if (mode.mode === 1) {
        //update
        const updatedArea = {
          id: currentArea?._id,
          TenKhuVuc: values.name.trim(),
          HinhAnh: imageSelecting,
          MoTa: values.description.trim(),
          ViTriCuThe: values.detail.trim(),
          SoNguoiToiDa: currentArea?.SoNguoiToiDa,
        };
        console.log(updatedArea);
        try {
          const addAreaRs = await updateArea(updatedArea);
          if (addAreaRs.data._id) {
            enqueueSnackbar("Cập nhật khu vực thành công", {
              variant: "success",
            });
            handleCloseForm();
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Lỗi!. Không thể cập nhật khu vực", {
            variant: "error",
          });
        }
        // id,
        // TenKhuVuc,
        // HinhAnh,
        // MoTa,
        // ViTriCuThe,
        // SoNguoiToiDa,
      } else {
        const checkAreaId = async () => {
          try {
            const data = await getAreaByAreaId(values.id);
            if (data.data) {
              return true;
            } else {
              return false;
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        };
        const checkingRs = await checkAreaId();
        if (!checkingRs) {
          const newArea = {
            MaKhuVuc: values.id.trim(),
            TenKhuVuc: values.name.trim(),
            HinhAnh: imageSelecting,
            MoTa: values.description.trim(),
            ViTriCuThe: values.detail.trim(),
            SoNguoiToiDa: 0,
          };
          try {
            const addAreaRs = await addNewArea(newArea);
            if (addAreaRs.data._id) {
              enqueueSnackbar("Thêm khu vực thành công", {
                variant: "success",
              });
              handleCloseForm();
            }
          } catch (error) {
            console.log(error);
            enqueueSnackbar("Lỗi!. Không thể thêm khu vực", {
              variant: "error",
            });
          }
        } else {
          enqueueSnackbar("Mã khu vực bị trùng", {
            variant: "error",
          });
        }
      }
    }
  };
  const handleChangeImage = async (e) => {
    if (e.target.files.length > 0) {
      setIsLoadedImage(true);
      const base64 = await convertBase64(e.target.files[0]);
      uploadImage(base64).then((image) => {
        setImageSelecting(image.data);
      });
    } else {
      setIsLoadedImage(false);
      setImageSelecting(null);
    }
  };
  const { user, updateAuthUser } = useAuthContext();
  return (
    <AreaUpdateFormStyles>
      <form className="main__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="overlay" onClick={handleCloseForm}></div>
        <div className="modal__main">
          <div className="modal__title">
            <div className="title__container">
              <h4 className="title__text">
                {mode?.mode === 1 ? "Cập Nhật Khu Vực" : "Thêm Khu Vực"}
              </h4>
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
                      disabled={mode?.mode === 1 ? true : false}
                      className="input"
                      id="id"
                      type="text"
                      name="id"
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
                      className="input"
                      id="name"
                      name="name"
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
                      name="image"
                      id="image"
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
                      name="detail"
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
                      name="description"
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
