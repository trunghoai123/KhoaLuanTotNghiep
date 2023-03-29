const menuModel = require("../models/menu.model");

class MenuService {
  static addMenu = async ({ TenMon, GiaMon, DonViTinh,MoTa, HinhAnh, MaLoai }) => {
    try {
      const newMenu = await menuModel.create({
        TenMon,
        GiaMon,
        DonViTinh,
        MoTa,
        HinhAnh,
        MaLoai,
      });
      if (newMenu) {
        return {
          code: 201,
          metadata: {
            success: true,
            data: newMenu,
          },
        };
      }
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "add menu error",
        },
      };
    }
  };

  static updateMenu = async ({id,TenMon, GiaMon, DonViTinh,MoTa, HinhAnh, MaLoai})=>{
    try{
        const updateMenu = await menuModel.findOneAndUpdate({
            _id: id
        },{
          TenMon, GiaMon, DonViTinh,MoTa, HinhAnh, MaLoai
        },{
            new: true
        })
        return {
            code: 200,
            metadata:{
                success: true,
                message: 'Update thành công',
                data: updateMenu,
            }
        }
        
    }
    catch(err){
        return {
            code: 500,
            metadata:{
                success: false,
                message: err.message,
                status: 'update menu error',
            }
        }
    }
}
static deleteMenu = async ({id})=>{
    try{
        await menuModel.deleteOne({ _id: id })
        return {
            code: 200,
            metadata:{
                success: true,
                message: "Xóa thành công",
            }
        }
        
    }
    catch(err){
        return {
            code: 500,
            metadata:{
                success: false,
                message: err.message,
                status: 'delete menu error',
            }
        }
    }
}


  static getAllMenu = async () => {
    try {
      const menus = await menuModel.find().populate('MaLoai').exec();

      return {
        code: 200,
        metadata: {
          success: true,
          data: menus,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
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
          success: true,
          data: menu,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get one menu error",
        },
      };
    }
  };


  static getMenuByAll = async ({TenMon,GiaMon , DonViTinh , MoTa , MaLoai }) => {
    try {
        let query = {
              TenMon: { $regex: TenMon , $options: 'i'},
              DonViTinh: { $regex: DonViTinh , $options: 'i'},
              MoTa: { $regex: MoTa , $options: 'i'},
              GiaMon: { $gte: GiaMon? GiaMon : 0 },
            }
        if(MaLoai){
            query.MaLoai = MaLoai
        }
        
        const menus = await menuModel.find(query)
            .populate('MaLoai')
        return {
            code: 200,
            metadata: {
            success: true,
            data: menus,
            },
        };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get menus error",
        },
      };
    }
};
static getMenuByTypeMenuId = async ({MaLoai}) => {
    try {
      const menus = await menuModel.find({ MaLoai : MaLoai }).populate('MaLoai')
      return {
        code: 200,
        metadata: {
          success: true,
          data: menus,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get menu error",
        },
      };
    }
};
}

module.exports = MenuService;
