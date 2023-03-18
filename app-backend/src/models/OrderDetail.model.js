const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'ChiTietPhieuDat';
const DOCUMENT_NAME = 'ChiTietPhieuDat';

const orderDetailSchema = new Schema({
   
    MaPhieuDat:{
        type: Schema.Types.ObjectId,
        ref:'PhieuDat'
    },
    ListThucDon:[{
        _id: false,
        MaThucDon: {
          type: Schema.Types.ObjectId,
          ref:'Phong'
        },
        SoLuong:{
            type: Number,
        },
      }],
    ListPhong:[
        {
            type: Schema.Types.ObjectId,
            ref:'Phong'
        }
      ]
    ,
    ListBan:[
         {
            type: Schema.Types.ObjectId,
            ref:'Ban'
        },
      ]
    ,

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, orderDetailSchema);