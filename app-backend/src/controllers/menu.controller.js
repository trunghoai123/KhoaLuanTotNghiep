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

  getAllMenu = async (req, res, next) => {
    try {
      const result = await MenuService.getAllMenu();
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new MenuController();
