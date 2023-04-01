import axiosClient from "./axios";

export const uploadImage = (base64) => {
  return axiosClient.post("/image/sendImageAndGetLink", { image: base64 }).then((res) => {
    return res.data;
  });
};

export const getAreaById = (id) => {
  return axiosClient.post(`/area/getAreaById/${id}`).then((res) => {
    return res.data;
  });
};
