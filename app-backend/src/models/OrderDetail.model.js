const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'ChiTietPhieuDat';
const DOCUMENT_NAME = 'ChiTietPhieuDat';

const orderDetailSchema = new Schema({
    SoLuong:{
        type: Number,
    },
    DonGia:{
        type: Number,
    },
    DonViTinh:{
        type: String,
    },
    MaPhieuDat:{
        type: Schema.Types.ObjectId,
        ref:'PhieuDat'
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

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, orderDetailSchema);