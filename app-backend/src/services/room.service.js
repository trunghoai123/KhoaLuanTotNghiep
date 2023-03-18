const roomModel = require("../models/room.model")
const orderModel = require("../models/order.model")
const orderDetailModel = require("../models/orderDetail.model")


class RoomService {



    static addRoom = async ({TenPhong , TrangThai , SoChoNgoiToiDa , HinhAnh, MaLoai , MaKhuVuc})=>{
        try{
            const newRoom = await roomModel.create({
                TenPhong , TrangThai , SoChoNgoiToiDa  , HinhAnh, MaLoai , MaKhuVuc
            })
            if(newRoom){
                return {
                    code: 201,
                    metadata:{
                        data: newRoom,
                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'add room error',
                }
            }
        }
    }

    static getAllRoom = async () =>{
        try{
            const rooms = await roomModel.find();
            return {
                code: 200,
                metadata: {
                    data: rooms
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'get all room error',
                }
            }
        }
    }

    static getRoomMatchTimeAndSeat = async ({ SoNguoi , ThoiGianBatDau , ThoiGianKetThuc  }) =>{
        try{
            //lay các phiếu đặt phòng có thời gian không hợp lệ
            const orders = await orderModel.find({
                $or: [
                    { ThoiGianBatDau: { $lte: ThoiGianBatDau } ,  ThoiGianKetThuc: { $gte: ThoiGianBatDau }},
                    { ThoiGianBatDau: { $lte: ThoiGianKetThuc } ,  ThoiGianKetThuc: { $gte: ThoiGianKetThuc } },
                    { ThoiGianBatDau: { $lte: ThoiGianBatDau } ,  ThoiGianKetThuc: { $gte: ThoiGianKetThuc } },
                    { ThoiGianBatDau: { $gte: ThoiGianBatDau } ,  ThoiGianKetThuc: { $lte: ThoiGianKetThuc } },
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
                    ]
                  }).lean()
            }else{
                roomMatchs = await roomModel.find({
                    SoChoNgoiToiDa: { $gte: SoNguoi }
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
}

module.exports = RoomService