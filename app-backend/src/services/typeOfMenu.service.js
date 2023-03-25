const model = require('../models/TypeOfMenu.model')

class TypeOfMenuService{

    static addTypeOfMenu = async ({TenLoai})=>{
        try{
            const newTypeOfMenu = await model.create({
                TenLoai
            })
            if(newTypeOfMenu){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: newTypeOfMenu,
                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'add type Menu error',
                }
            }
        }
    }

    static updateTypeOfMenu = async ({id,TenLoai})=>{
        try{
            const updateTypeOfMenu = await model.findOneAndUpdate({
                _id: id
            },{
                TenLoai
            },{
                new: true
            })
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: 'Update thành công',
                    data: updateTypeOfMenu,
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'update type Menu error',
                }
            }
        }
    }
    static deleteTypeOfMenu = async ({id})=>{
        try{
            await model.deleteOne({ _id: id })
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
                    status: 'delete table error',
                }
            }
        }
    }

    static getAllTypeOfMenu = async () =>{
        try{
            const typeOfMenus = await model.find();
            return {
                code: 200,
                metadata: {
                    success:true,
                    data: typeOfMenus
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success:false,
                    message: err.message,
                    status: 'get all type Menu error',
                }
                
            }
        }
    }

    // static getTableById = async (id) => {
    //     try {
    //       const table = await modelTable.findOne({ _id: id });
    //       return {
    //         code: 200,
    //         metadata: {
    //           success: true,
    //           data: table,
    //         },
    //       };
    //     } catch (err) {
    //       return {
    //         code: 500,
    //         metadata: {
    //           success: false,
    //           message: err.message,
    //           status: "get table error",
    //         },
    //       };
    //     }
    //   };
}

module.exports = TypeOfMenuService;