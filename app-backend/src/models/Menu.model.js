const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'ThucDon';
const DOCUMENT_NAME = 'ThucDon';

const menuSchema = new Schema({
    TenMon:{
        type:String,
        required:true,
    },
    GiaMon:{
        type:Number,
    },
    MoTa:{
        type:String,
    },
    HinhAnh:{
        type:String,

    },
    MaLoai:{
        type: Schema.Types.ObjectId,
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, menuSchema);