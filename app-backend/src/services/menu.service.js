const menuModel = require("../models/menu.model");

class MenuService {
  static addMenu = async ({ TenMon, GiaMon, MoTa, HinhAnh, MaLoai }) => {
    try {
      const newMenu = await menuModel.create({
        TenMon,
        GiaMon,
        MoTa,
        HinhAnh,
        MaLoai,
      });
      if (newMenu) {
        return {
          code: 201,
          metadata: {
            data: newMenu,
          },
        };
      }
    } catch (err) {
      return {
        code: 500,
        metadata: {
          message: err.message,
          status: "add menu error",
        },
      };
    }
  };

  static getAllMenu = async () => {
    try {
      const menus = await menuModel.find();

      return {
        code: 200,
        metadata: {
          data: menus,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          message: err.message,
          status: "get all menu error",
        },
      };
    }
  };
  static getOneMenu = async (id) => {
    try {
      const menu = await menuModel.findOne({ _id: id });
      return {
        code: 200,
        metadata: {
          data: menu,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          message: err.message,
          status: "get one menu error",
        },
      };
    }
  };
}

module.exports = MenuService;
