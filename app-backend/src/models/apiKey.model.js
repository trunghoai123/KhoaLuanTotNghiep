const { model , Schema} = require('mongoose'); // Erase if already required
/**
 * 
 * 
 * 
 */
const COLLECTION_NAME = 'ApiKeys';
const DOCUMENT_NAME = 'ApiKey';

const apiKeySchema = new Schema({
    key:{
        type: String,
        required:true,
        unique: true
    },
    status:{
        type:Boolean,
        default: true
    },
    LoaiTaiKhoan:{
        type:Number,
        enum: [0,1,2],
        required: true
    },
  
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);