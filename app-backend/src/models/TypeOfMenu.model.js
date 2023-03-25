const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'LoaiThucDon';
const DOCUMENT_NAME = 'LoaiThucDon';

const typeOfMenuSchema = new Schema({
    TenLoai:{
        type:String,
        required:true,
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, typeOfMenuSchema);