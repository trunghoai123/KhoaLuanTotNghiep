const cloudinary = require("../config/config.cloudinary");
class ImageService {
  static sendImageAndGetLink = async ({ image, id }) => {
    try {
      console.log(image, id);
      const result = await cloudinary.uploader.upload(image, {
        public_id: id,
        folder: "RestaurantManagement",
      });

      return {
        code: 200,
        metadata: {
          data: result.secure_url,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          message: err.message,
          status: "upload image failed",
        },
      };
    }
  };
}

module.exports = ImageService;
