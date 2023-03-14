const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'HoaDon';
const DOCUMENT_NAME = 'HoaDon';

const invoiceSchema = new Schema({
    MaPhieuDat:{
        type: Schema.Types.ObjectId,
        ref:'PhieuDat'
    },
    MaNhanVien:{
        type: Schema.Types.ObjectId,
        ref:'NhanVien'
    },
    MaKhachHang:{
        type: Schema.Types.ObjectId,
        ref:'KhachHang'
    },
    TrangThai:{
        type: Number
    }

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, invoiceSchema);