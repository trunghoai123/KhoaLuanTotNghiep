const { model , Schema} = require('mongoose'); // Erase if already required
/**
 * 
 * 
 * 
 */
const COLLECTION_NAME = 'OTPS';
const DOCUMENT_NAME = 'OTP';

const otpSchema = new Schema({
    Email:{
        type: String,
        required:true,
    },
    OTP:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 120
    }
  
},{
    collection: COLLECTION_NAME,
});
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

//Export the model
module.exports = model(DOCUMENT_NAME, otpSchema);