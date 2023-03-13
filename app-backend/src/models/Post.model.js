const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'BaiViet';
const DOCUMENT_NAME = 'BaiViet';

const postSchema = new Schema({
    TieuDe:{
        type: String,
    },
    NoiDung:{
        type: String,
    },
    MaNhanVien:{
        type: Schema.Types.ObjectId,
        ref:'NhanVien'
    },

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, postSchema);