const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'NhanVien';
const DOCUMENT_NAME = 'NhanVien';

const employeeSchema = new Schema({
    TenNhanVien:{
        type: String,
        required: true,
    },
    SoDienThoai:{
        type: String,
    },
    DiaChi:{
        type: String,
    },
    NgaySinh:{
        type: Date
    },
    GioiTinh: {
        type: String,
    },
    Email:{
        type: String ,
        required: true
    },
    MaTaiKhoan:{
        type: Schema.Types.ObjectId,
        ref:'TaiKhoan',

    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, employeeSchema);