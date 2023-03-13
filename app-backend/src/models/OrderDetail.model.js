const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'ChiTietDonDat';
const DOCUMENT_NAME = 'ChiTietDonDat';

const orderDetailSchema = new Schema({
    SoLuong:{
        type: Number,
    },
    DonGia:{
        type: Number,
    },
    MaDonDat:{
        type: Schema.Types.ObjectId,
        ref:'DonDat'
    },
    MaThucDon:{
        type: Schema.Types.ObjectId,
        ref:'ThucDon'
    },

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, orderDetailSchema);