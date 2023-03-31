import axiosClient from "./axios";

export const uploadImage = (base64) => {
  return axiosClient.post("/image/sendImageAndGetLink", { image: base64 }).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
