const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'Phong';
const DOCUMENT_NAME = 'Phong';

const roomSchema = new Schema({
    MaPhong:{
        type:String,
        required:true,
    },
    TenPhong:{
        type:String,
        required:true,
    },
    TrangThai:{
        type:Number,
    },
    SoChoNgoiToiDa:{
        type:Number,
    },
    HinhAnh:{
        type:String,
    },
    MaLoai:{
        type: Schema.Types.ObjectId,
        ref:'LoaiPhong'
    },
    MaKhuVuc:{  
        type: Schema.Types.ObjectId,
        ref:'KhuVuc'
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, roomSchema);