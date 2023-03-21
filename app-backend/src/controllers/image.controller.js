const ImageService = require("../services/image.service");

class ImageController {
  sendImageAndGetLink = async (req, res, next) => {
    try {
      const result = await ImageService.sendImageAndGetLink(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ImageController();
