const roomModel = require("../models/room.model")
const orderModel = require("../models/order.model")
const orderDetailModel = require("../models/orderDetail.model")


class RoomService {



    static addRoom = async ({MaPhong,TenPhong , TrangThai , SoChoNgoiToiDa , HinhAnh, MaLoai , MaKhuVuc})=>{
        try{
            const newRoom = await roomModel.create({
                MaPhong,TenPhong , TrangThai , SoChoNgoiToiDa  , HinhAnh, MaLoai , MaKhuVuc
            })
            if(newRoom){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: newRoom,
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
                    status: 'add room error',
                }
            }
        }
    }

    static updateRoom = async ({id,TenPhong , TrangThai , SoChoNgoiToiDa , HinhAnh, MaLoai , MaKhuVuc})=>{
        try{
            const updateRoom = await roomModel.findOneAndUpdate({
                _id: id
            },{
                TenPhong , TrangThai , SoChoNgoiToiDa , HinhAnh, MaLoai , MaKhuVuc
            },{
                new: true
            })
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: 'Update thành công',
                    data: updateRoom,
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'update room error',
                }
            }
        }
    }
    static deleteRoom = async ({id})=>{
        try{
            await roomModel.deleteOne({ _id: id })
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
                    status: 'delete room error',
                }
            }
        }
    }


    static getAllRoom = async () =>{
        try{
            const rooms = await roomModel.find()
            .populate('MaKhuVuc')
            .populate('MaLoai')
            .exec();
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: rooms
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get all room error',
                }
            }
        }
    }

    static getRoomById = async (id) => {
        try {
          const room = await roomModel.findOne({ _id: id });
          return {
            code: 200,
            metadata: {
              success: true,
              data: room,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get room error",
            },
          };
        }
    };

    static getRoomMatchTimeAndSeat = async ({ SoNguoi , ThoiGianBatDau , LoaiPhieuDat , MaLoaiPhong }) =>{
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
            ,{ListPhong: 1 , _id: 0})

            //đổ nó thành 1 mảng duy nhất
            const roomIdNotMatch = []
            orderDetails.forEach((jsonObject) => {
                roomIdNotMatch.push(...jsonObject.ListPhong);
            });

            //lấy danh sách các phòng phù hợp
            let roomMatchs  = null;
            if(roomIdNotMatch.length>0){

                 roomMatchs = await roomModel.find({
                    $and: [
                      { _id: { $nin: roomIdNotMatch } },
                      { SoChoNgoiToiDa: { $gte: SoNguoi } },
                      { MaLoai: { $eq: MaLoaiPhong}}
                    ]
                  }).lean()
            }else{
                roomMatchs = await roomModel.find({
                    SoChoNgoiToiDa: { $gte: SoNguoi },
                    MaLoai: { $eq: MaLoaiPhong}
                })
            }

             

            return {
                code: 200,
                metadata: {
                    success: true,
                    data: roomMatchs
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get room error',
                }
            }
        }
    }

    static getRoomByTypeRoomId = async ({MaLoai}) => {
        try {
          const rooms = await roomModel.find({ MaLoai : MaLoai }).populate('MaKhuVuc')
          .populate('MaLoai')
          return {
            code: 200,
            metadata: {
              success: true,
              data: rooms,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get room error",
            },
          };
        }
    };
    static getRoomByAreaId = async ({MaKhuVuc}) => {
        try {
          const rooms = await roomModel.find({ MaKhuVuc : MaKhuVuc }).populate('MaKhuVuc')
          .populate('MaLoai')
          return {
            code: 200,
            metadata: {
              success: true,
              data: rooms,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get room error",
            },
          };
        }
    };

    static getRoomByAll = async ({MaPhong,TenPhong , TrangThai , SoChoNgoiToiDa , MaLoai , MaKhuVuc}) => {
        try {
            let query = {}
            if(MaLoai && !MaKhuVuc){
                query = {
                    MaPhong: { $regex: MaPhong },
                    TenPhong: { $regex: TenPhong },
                    TrangThai: TrangThai,
                    SoChoNgoiToiDa: { $gte: SoChoNgoiToiDa },
                    MaLoai: MaLoai,
                    }
            }
            if(!MaLoai && MaKhuVuc){
                query = {
                    MaPhong: { $regex: MaPhong },
                    TenPhong: { $regex: TenPhong },
                    TrangThai: TrangThai,
                    SoChoNgoiToiDa: { $gte: SoChoNgoiToiDa },
                    MaKhuVuc: MaKhuVuc,
                    }
            }
            if(!MaLoai && !MaKhuVuc){
                query = {
                    MaPhong: { $regex: MaPhong },
                    TenPhong: { $regex: TenPhong },
                    TrangThai: TrangThai,
                    SoChoNgoiToiDa: { $gte: SoChoNgoiToiDa },
                    }
            }
            if(MaLoai && MaKhuVuc){
                query = {
                    MaPhong: { $regex: MaPhong },
                    TenPhong: { $regex: TenPhong },
                    TrangThai: TrangThai,
                    SoChoNgoiToiDa: { $gte: SoChoNgoiToiDa },
                    MaKhuVuc: MaKhuVuc,
                    MaLoai: MaLoai,
                }
            }
                
            const rooms = await roomModel.find(query)
                .populate({
                    path: 'MaKhuVuc',
                    select: 'TenKhuVuc MaKhuVuc'
                  })
                .populate('MaLoai')
            return {
                code: 200,
                metadata: {
                success: true,
                data: rooms,
                },
            };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get room error",
            },
          };
        }
    };

    

}

module.exports = RoomService