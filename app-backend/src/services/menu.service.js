const menuModel = require("../models/menu.model")

class MenuService {

    static add = async ({TenMon , GiaMon , MoTa , HinhAnh , MaLoai})=>{
        try{
            const newMenu = await menuModel.create({
                TenMon , GiaMon , MoTa , HinhAnh , MaLoai
            })
            if(newMenu){

                return {
                    code: 201,
                    metadata:{
                        menu: newMenu,

                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                message: err.message,
                status: 'add menu error',
            }
        }
    }
}

module.exports = MenuService