const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'KhuVuc';
const DOCUMENT_NAME = 'KhuVuc';

const areaSchema = new Schema({
    MaKhuVuc:{
        type:String,
        required:true,
    },
    TenKhuVuc:{
        type:String,
        required:true,
    },
    HinhAnh:{
        type:String,
    },
    MoTa:{
        type:String,
    },
    ViTriCuThe:{
        type:String,
    },
    SoNguoiToiDa:{
        type:Number,
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, areaSchema);