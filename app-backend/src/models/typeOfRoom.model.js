const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'LoaiPhong';
const DOCUMENT_NAME = 'LoaiPhong';

const typeOfRoomSchema = new Schema({
    TenLoai:{
        type:String,
        required:true,
    },
    DonGia:{
        type: Number,
        required: true,
    },
    DonViTinh:{
        type: String,
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, typeOfRoomSchema);