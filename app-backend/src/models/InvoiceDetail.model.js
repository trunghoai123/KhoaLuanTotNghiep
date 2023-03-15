const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'ChiTietHoaDon';
const DOCUMENT_NAME = 'ChiTietHoaDon';

const invoiceDetailSchema = new Schema({
    DonGia:{
        type: Number,
    },
    DonViTinh:{
        type: String,
    },
    SoLuong:{
        type: Number,
    },
    MaHoaDon:{
        type: Schema.Types.ObjectId,
        ref:'HoaDon'
    },
    MaThucDon:{
        type: Schema.Types.ObjectId,
        ref:'ThucDon'
    },
    MaPhong:{
        type: Schema.Types.ObjectId,
        ref:'Phong'
    },
    MaBan:{
        type: Schema.Types.ObjectId,
        ref:'Ban'
    },
    MaChiTietPhieuDat:{
        type: Schema.Types.ObjectId,
        ref:'ChiTietPhieuDat'
    }

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, invoiceDetailSchema);