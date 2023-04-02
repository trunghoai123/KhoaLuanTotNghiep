const orderModel = require("../models/order.model");
const orderDetailModel = require("../models/orderDetail.model");
const {sendMail, templateMailSendOrder , templateMailChangeStatus} = require("../utils");




class OrderService {
  static addOrder = async ({
    LoaiPhieuDat,
    TrangThai,
    SoLuongNguoi,
    ThoiGianBatDau,
    ThoiGianKetThuc,
    MaKhachHang,
    ListThucDon,
    ListPhong,
    ListBan,
    HoTen ,
    Email ,
    SoDienThoai,
    GhiChu
  }) => {
    try {
      const newOrder = await orderModel.create({
        LoaiPhieuDat,
        TrangThai,
        SoLuongNguoi,
        ThoiGianBatDau,
        ThoiGianKetThuc,
        MaKhachHang,
        HoTen ,
        Email ,
        SoDienThoai,
        GhiChu
      });
      if (newOrder) {
        const newOrderDetail = await orderDetailModel.create({
          MaPhieuDat: newOrder._id,
          ListThucDon,
          ListPhong,
          ListBan,
        });

        if (newOrderDetail) {


          let subject = "Yêu cầu đặt phòng thành công";
          if(LoaiPhieuDat == 0){
            subject = "Yêu cầu đặt bàn thành công"
          }
          let mail = Email
           
          let html = templateMailSendOrder(LoaiPhieuDat)

          let check = sendMail(mail,subject,html)

          return {
            code: 201,
            metadata: {
              success: true,
              data: {
                Order: newOrder,
                OrderDetail: newOrderDetail,
              },
            },
          };
        }

        return {
          code: 500,
          metadata: {
            success: false,
            data: null,
          },
        };
      }

      return {
        code: 500,
        metadata: {
          success: false,
          data: null,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "add order error",
        },
      };
    }
  };

  static getOrderByUser = async ({ MaKhachHang }) => {
    try {
      const orders = await orderModel.find({ MaKhachHang })
      return {
        code: 200,
        metadata: {
          success: true,
          data: orders,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order by user error",
        },
      };
    }
  };
  static getOrderDetailByOrder = async ({ MaPhieuDat }) => {
    try {
      const orderDetail = await orderDetailModel.find({ MaPhieuDat })
      .populate({
        path: 'MaPhieuDat',
        populate: {
          path: 'MaKhachHang',
        }
      }).exec();
      return {
        code: 200,
        metadata: {
          success: true,
          data: orderDetail,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order detail by order error",
        },
      };
    }
  };

  static getAllOrder = async () => {
    try {
      const orders = await orderModel.find()
      return {
        code: 200,
        metadata: {
          success: true,
          data: orders,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get all order error",
        },
      };
    }
  };

  static getOrderById = async ({ id }) => {
    try {
      const order = await orderModel.findOne({ _id: id }).populate('MaKhachHang')
      return {
        code: 200,
        metadata: {
          success: true,
          data: order,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order by id error",
        },
      };
    }
  };

  static updateOrder = async ({
    id,
    LoaiPhieuDat,
    TrangThai,
    SoLuongNguoi,
    ThoiGianBatDau,
    ThoiGianKetThuc,
    MaKhachHang,
    ListThucDon,
    ListPhong,
    ListBan,
    HoTen ,
    Email ,
    SoDienThoai,
    GhiChu
  }) => {
    try {
      const updateOrder = await orderModel.findOneAndUpdate({
        _id: id
    },{
      LoaiPhieuDat,
      TrangThai,
      SoLuongNguoi,
      ThoiGianBatDau,
      ThoiGianKetThuc,
      MaKhachHang,
      HoTen ,
      Email ,
      SoDienThoai,
      GhiChu
    },{
        new: true
    })
      if (updateOrder) {
        const updateOrderDetail = await orderDetailModel.findOneAndUpdate({
            MaPhieuDat: updateOrder._id, 
        },{
          ListThucDon,
          ListPhong,
          ListBan,
        },{
          new: true
        })

        if (updateOrderDetail) {
          
          if(TrangThai == 1){
            let subject = "Đặt phòng thành công";
            if(LoaiPhieuDat == 0){
              subject = "Đặt bàn thành công"
            }
            let mail = Email
            
            let html = templateMailChangeStatus(LoaiPhieuDat)

            let check = sendMail(mail,subject,html)
          }

          return {
            code: 200,
            metadata: {
              success: true,
              data: {
                Order: updateOrder,
                OrderDetail: updateOrderDetail,
              },
            },
          };
        }

        return {
          code: 500,
          metadata: {
            success: false,
            data: null,
          },
        };
      }

      return {
        code: 500,
        metadata: {
          success: false,
          data: null,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "update order error",
        },
      };
    }
  };

}

module.exports = OrderService;
