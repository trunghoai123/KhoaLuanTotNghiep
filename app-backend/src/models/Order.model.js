const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'PhieuDat';
const DOCUMENT_NAME = 'PhieuDat';

const orderSchema = new Schema({
    /**
     * 0 phiếu đặt phòng
     * 1 phiếu đặt bàn
     */
    LoaiPhieuDat:{
        type: Number,
        required: true,
    },
    /**
     * 0 đang chờ duyệt
     * 1 đã duyệt
     */
    TrangThai:{
        type: Number,
        required: true,
    },
    SoLuongNguoi:{
        type: Number,
        required: true,
    },
    ThoiGianBatDau: {
        type: Date,
    },
    ThoiGianKetThuc: {
        type: Date,
    },
    MaNhanVien:{
        type: Schema.Types.ObjectId,
        ref:'NhanVien'
    },
    MaKhachHang:{
        type: Schema.Types.ObjectId,
        ref:'KhachHang'
    },

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, orderSchema);