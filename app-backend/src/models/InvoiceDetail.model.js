const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'ChiTietHoaDon';
const DOCUMENT_NAME = 'ChiTietHoaDon';

const invoiceDetailSchema = new Schema({
    DonGia:{
        type: Number,
    },
    SoLuong:{
        type: Number,
    },
    MaHoaDon:{
        type: Schema.Types.ObjectId,
        ref:'HoaDon'
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
module.exports = model(DOCUMENT_NAME, invoiceDetailSchema);