const roomModel = require("../models/room.model")

class RoomService {



    static addRoom = async ({TenPhong , TrangThai , SoChoNgoiToiDa , GiaPhong , HinhAnh, MaLoai , MaKhuVuc})=>{
        try{
            const newRoom = await roomModel.create({
                TenPhong , TrangThai , SoChoNgoiToiDa , GiaPhong , HinhAnh, MaLoai , MaKhuVuc
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
}

module.exports = RoomService