const modelTable = require('../models/table.model')

class TableService{

    static addTable = async ({SoThuThuBan , TrangThai  , SoChoNgoi , MaPhong})=>{
        try{
            const newTable = await modelTable.create({
                SoThuThuBan , TrangThai  , SoChoNgoi , MaPhong
            })
            if(newTable){
                return {
                    code: 201,
                    metadata:{
                        data: newTable,
                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'add table error',
                }
            }
        }
    }

    static getAllTable = async () =>{
        try{
            const tables = await modelTable.find();
            return {
                code: 200,
                metadata: {
                    data: tables
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'get all table error',
                }
                
            }
        }
    }
}

module.exports = TableService;