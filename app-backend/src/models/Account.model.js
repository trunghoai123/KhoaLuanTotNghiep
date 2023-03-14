const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'TaiKhoan';
const DOCUMENT_NAME = 'TaiKhoan';

const accountSchema = new Schema({
    Email:{
        type:String,
        required:true,
    },
    MatKhau:{
        type:String,
        required:true,
    },
    /**
     * 0 KhachHang
     * 1 NhanVien
     * 2 QuanLy
     */
    LoaiTaiKhoan:{
        type:Number,
        enum: [0,1,2],
        default: 0,
    },
    HinhAnh:{
        type: String
    },
    TrangThai:{
        type: Number
    },
    XacThuc:{
        type: Schema.Types.Boolean,
        default: false
    }
   
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, accountSchema);