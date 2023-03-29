const { model , Schema} = require('mongoose'); // Erase if already required
/**
 * 
 * 
 * 
 */
const COLLECTION_NAME = 'Keys';
const DOCUMENT_NAME = 'Key';

const keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'TaiKhoan'
    },
    privateKey:{
        type:String,
        required: true
    },
    publicKey:{
        type:String,
        required: true
    },
    refreshTokens:{
        type:Array,
        default: []
    },
    refreshToken:{
        type:String,
        required: true
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);