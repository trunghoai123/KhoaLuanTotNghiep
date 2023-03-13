const { model , Schema, SchemaType} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'DanhGia';
const DOCUMENT_NAME = 'DanhGia';

const rateSchema = new Schema({
    BinhLuan:{
        type: String,
    },
    DiemDanhGia:{
        type: Number,
    },
    MaThucDon:{
        type: Schema.Types.ObjectId,
        ref:'ThucDon'
    },
    MaKhachHang:{
        type: Schema.Types.ObjectId,
        ref:'KhachHang'
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, rateSchema);