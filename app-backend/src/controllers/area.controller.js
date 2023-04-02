const AreaService = require("../services/area.service");

class AreaController {
  addArea = async (req, res, next) => {
    try {
      const result = await AreaService.addArea(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  updateArea = async (req, res, next) => {
    console.log(req.body);
    try {
      const result = await AreaService.updateArea(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  deleteArea = async (req, res, next) => {
    try {
      const result = await AreaService.deleteArea(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  getAreaById = async (req, res, next) => {
    try {
      const result = await AreaService.getAreaById(req.params.areaId);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  getAllArea = async (req, res, next) => {
    try {
      const result = await AreaService.getAllArea();
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  getAreaByAreaId = async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await AreaService.getAreaByAreaId(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new AreaController();
