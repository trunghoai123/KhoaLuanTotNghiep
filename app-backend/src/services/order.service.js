const orderModel = require("../models/order.model")
const orderDetailModel = require("../models/orderDetail.model")


class OrderService {

    static addOrder = async ({LoaiPhieuDat , TrangThai , SoLuongNguoi , ThoiGianBatDau , MaKhachHang ,ListThucDon , ListPhong , ListBan })=>{
        try{
            const newOrder = await orderModel.create({
                LoaiPhieuDat , TrangThai , SoLuongNguoi , ThoiGianBatDau , MaKhachHang
            })
            if(newOrder){

                const newOrderDetail =  await orderDetailModel.create({
                        MaPhieuDat : newOrder._id , ListThucDon , ListPhong , ListBan
                })

                if(newOrderDetail){
                    return {
                        code: 201,
                        metadata:{
                            success: true,
                            data: {
                                Order: newOrder,
                                OrderDetail : newOrderDetail
                            }
                        }
                    }
                }
                
                return {
                    code: 500,
                    metadata:{
                        success: false,
                        data: null
                    }
                }

                
            }

            return {
                code: 500,
                metadata:{
                    success: false,
                    data: null
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'add order error',
                }
            }
        }
    }

    static getOrderByUser = async ({ MaKhachHang}) =>{
        try{
            const orders = await orderModel.find({MaKhachHang});
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: orders
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get order by user error',
                }
            }
        }
    }

    static getAllOrder = async () =>{
        try{
            const orders = await orderModel.find();
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: orders
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get all order error',
                }
            }
        }
    }
}

module.exports = OrderService