import axiosClient from "./axios";

export const uploadImage = (base64) => {
  return axiosClient.post("/image/sendImageAndGetLink", { image: base64 }).then((res) => {
    return res.data;
  });
};

export const getAreaByAreaId = (MaKhuVuc) => {
  return axiosClient.get(`/area/getAreaByAreaId`, { MaKhuVuc }).then((res) => {
    return res.data;
  });
};
