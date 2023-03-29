const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'PhieuDat';
const DOCUMENT_NAME = 'PhieuDat';

const orderSchema = new Schema({
    /**
     * 0 phiếu đặt bàn
     * 1 phiếu đặt phòng thường
     * 2 phòng vip
     */
    LoaiPhieuDat:{
        type: Number,
        required: true,
    },
    /**
     * 0 đang chờ duyệt
     * 1 đã duyệt
     * 2
     * 3
     * 4
     * 5
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
    GhiChu: {
        type: String,
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