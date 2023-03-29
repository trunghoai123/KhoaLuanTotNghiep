const modelTable = require('../models/table.model')
const orderModel = require("../models/order.model")
const orderDetailModel = require("../models/orderDetail.model")
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

      static getTableMatchTimeAndSeat = async ({ SoNguoi , ThoiGianBatDau , LoaiPhieuDat }) =>{
        try{
            //lay các phiếu đặt phòng có thời gian không hợp lệ
            const orders = await orderModel.find({
                $and: [
                    {
                      $expr: {
                        $eq: [
                          { $dateToString: { format: "%Y-%m-%d", date: "$ThoiGianBatDau" } },
                          ThoiGianBatDau
                        ]
                      }
                    },
                    {
                        LoaiPhieuDat: { $eq: LoaiPhieuDat}
                    }
                  ]
                
                    
            },{_id: 1})

            //chỉ lấy mã
            const orderIds = orders.map((order) => order._id);

            //từ mã lấy các phòng từ bảng chi tiết đặt phòng tương ứng với từng mã
            const orderDetails = await orderDetailModel.find({MaPhieuDat: { $in: orderIds }}
            ,{ListBan: 1 , _id: 0})

            //đổ nó thành 1 mảng duy nhất
            const tableIdNotMatch = []
            orderDetails.forEach((jsonObject) => {
                tableIdNotMatch.push(...jsonObject.ListBan);
            });

            //lấy danh sách các phòng phù hợp
            let tableMatchs  = null;
            if(tableIdNotMatch.length>0){

                tableMatchs = await modelTable.find({
                    $and: [
                      { _id: { $nin: tableIdNotMatch } },
                      { SoChoNgoi: { $gte: SoNguoi } },
                    ]
                  }).lean()
            }else{
                tableMatchs = await modelTable.find({
                    SoChoNgoi: { $gte: SoNguoi },
                })
            }

             

            return {
                code: 200,
                metadata: {
                    success: true,
                    data: tableMatchs
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get table error',
                }
            }
        }
    }
    static getTableByAll = async ({MaBan,SoThuTuBan , TrangThai , SoChoNgoi , MaPhong }) => {
        try {
            let query = {
                    MaBan: { $regex: MaBan, $options: 'i' },
                    SoChoNgoi: { $gte: SoChoNgoi },
                }
            if(MaPhong){
                query.MaPhong = MaPhong
            }
            if(SoThuTuBan){
                query.SoThuTuBan = SoThuTuBan
            }if(TrangThai){
                query.TrangThai = TrangThai
            }
           
           
            
            
            const tables = await modelTable.find(query)
                .populate('MaPhong')
            return {
                code: 200,
                metadata: {
                success: true,
                data: tables,
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
    static getTableByRoomId = async ({MaPhong}) => {
        try {
          const tables = await modelTable.find({ MaPhong : MaPhong }).populate('MaPhong')
          return {
            code: 200,
            metadata: {
              success: true,
              data: tables,
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