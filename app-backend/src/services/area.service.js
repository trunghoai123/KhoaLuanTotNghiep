const areaModel = require("../models/area.model")

class AreaService {

    static addArea = async ({TenKhuVuc , HinhAnh , MoTa , ViTriCuThe})=>{
        try{
            const newArea = await areaModel.create({
                TenKhuVuc , HinhAnh , MoTa , ViTriCuThe
            })
            if(newArea){
                return {
                    code: 201,
                    metadata:{
                        data: newArea,
                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'add area error',
                }
            }
        }
    }

    static getAllArea = async () =>{
        try{
            const areas = await areaModel.find();
            return {
                code: 200,
                metadata: {
                    data: areas
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'get all area error',
                }
                
            }
        }
    }
}

module.exports = AreaService