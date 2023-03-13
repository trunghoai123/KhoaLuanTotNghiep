const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'HoaDon';
const DOCUMENT_NAME = 'HoaDon';

const invoiceSchema = new Schema({
    MaDonDat:{
        type: Schema.Types.ObjectId,
        ref:'DonDat'
    },
    MaPhong:{
        type: Schema.Types.ObjectId,
        ref:'Phong'
    },

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, invoiceSchema);