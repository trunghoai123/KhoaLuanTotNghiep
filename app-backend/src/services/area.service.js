const areaModel = require("../models/area.model");

class AreaService {
  static addArea = async ({
    MaKhuVuc,
    TenKhuVuc,
    HinhAnh,
    MoTa,
    ViTriCuThe,
    SoNguoiToiDa,
  }) => {
    try {
      const newArea = await areaModel.create({
        MaKhuVuc,
        TenKhuVuc,
        HinhAnh,
        MoTa,
        ViTriCuThe,
        SoNguoiToiDa,
      });
      if (newArea) {
        return {
          code: 201,
          metadata: {
            success: true,
            data: newArea,
          },
        };
      }
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "add area error",
        },
      };
    }
  };
  static updateArea = async ({
    id,
    TenKhuVuc,
    HinhAnh,
    MoTa,
    ViTriCuThe,
    SoNguoiToiDa,
  }) => {
    try {
      const updateArea = await areaModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          TenKhuVuc,
          HinhAnh,
          MoTa,
          ViTriCuThe,
          SoNguoiToiDa,
        },
        {
          new: true,
        }
      );
      return {
        code: 200,
        metadata: {
          success: true,
          message: "Update thành công",
          data: updateArea,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "update area error",
        },
      };
    }
  };
  static deleteArea = async ({ id }) => {
    try {
      await areaModel.deleteOne({ _id: id });

      return {
        code: 200,
        metadata: {
          success: true,
          message: "Xóa thành công",
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "delete area error",
        },
      };
    }
  };

  static getAllArea = async () => {
    try {
      const areas = await areaModel.find();
      return {
        code: 200,
        metadata: {
          success: true,
          data: areas,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get all area error",
        },
      };
    }
  };
  static getAreaById = async (id) => {
    try {
      const area = await areaModel.findOne({ _id: id });
      return {
        code: 200,
        metadata: {
          success: true,
          data: area,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get area error",
        },
      };
    }
  };
}

module.exports = AreaService;
