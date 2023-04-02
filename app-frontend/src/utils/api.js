import axios from "axios";
import axiosClient from "./axios";

export const uploadImage = (base64) => {
  return axiosClient.post("/image/sendImageAndGetLink", { image: base64 }).then((res) => {
    return res.data;
  });
};

export const getAreaByAreaId = async (MaKhuVuc) => {
  return axios.post(`http://localhost:5500/api/area/getAreaByAreaId`, { MaKhuVuc }).then((res) => {
    return res.data;
  });
};

export const addNewArea = (area) => {
  return axios.get(`/area/addArea`, area).then((res) => {
    return res.data;
  });
};
// export const addOrderAPI = async (data) => {
//   const response = await axiosClient.post(`order/addOrder`, { ...data });
//   return response.data;
// };

// export const getAreaByIdAPI =
