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
    LoaiTaiKhoan:{
        type:Number,
        required:true,
    }
   
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, accountSchema);