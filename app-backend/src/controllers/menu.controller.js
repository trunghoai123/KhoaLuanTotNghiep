const MenuService = require("../services/menu.service");

class MenuController {
  addMenu = async (req, res, next) => {
    try {
      const result = await MenuService.addMenu(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  updateMenu = async (req, res, next) => {
    try {
      const result = await MenuService.updateMenu(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
      const result = await MenuService.deleteMenu(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };


  getAllMenu = async (req, res, next) => {
    try {
      const result = await MenuService.getAllMenu(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  getOneMenu = async (req, res, next) => {
    try {
      const result = await MenuService.getOneMenu(req.params.dishId);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getMenuByTypeMenuId = async (req, res, next) => {
    try {
      const result = await MenuService.getMenuByTypeMenuId(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getMenuByAll = async (req, res, next) => {
    try {
      const result = await MenuService.getMenuByAll(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new MenuController();
