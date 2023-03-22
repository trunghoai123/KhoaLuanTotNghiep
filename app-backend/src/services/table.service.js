const modelTable = require('../models/table.model')

class TableService{

    static addTable = async ({MaBan,SoThuTuBan , TrangThai  , SoChoNgoi , MaPhong})=>{
        try{
            const newTable = await modelTable.create({
                MaBan,SoThuTuBan , TrangThai  , SoChoNgoi , MaPhong
            })
            if(newTable){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: newTable,
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
                    status: 'add table error',
                }
            }
        }
    }

    static updateTable = async ({id,SoThuTuBan , TrangThai  , SoChoNgoi , MaPhong})=>{
        try{
            const updateTable = await modelTable.findOneAndUpdate({
                _id: id
            },{
                SoThuTuBan , TrangThai  , SoChoNgoi , MaPhong
            },{
                new: true
            })
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: 'Update thành công',
                    data: updateTable,
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'update table error',
                }
            }
        }
    }
    static deleteTable = async ({id})=>{
        try{
            await modelTable.deleteOne({ _id: id })
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

    static getAllTable = async () =>{
        try{
            const tables = await modelTable.find().populate('MaPhong').exec();
            return {
                code: 200,
                metadata: {
                    success:true,
                    data: tables
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success:false,
                    message: err.message,
                    status: 'get all table error',
                }
                
            }
        }
    }

    static getTableById = async (id) => {
        try {
          const table = await modelTable.findOne({ _id: id });
          return {
            code: 200,
            metadata: {
              success: true,
              data: table,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get table error",
            },
          };
        }
      };
}

module.exports = TableService;