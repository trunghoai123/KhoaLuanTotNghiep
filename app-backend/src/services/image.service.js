
const cloudinary = require('../config/config.cloudinary');
class ImageService {

    static sendImageAndGetLink = async  (image) =>{
        try{
            const result = await cloudinary.uploader
            .upload(image,{
                folder: "RestaurantManagement",
            }) 
            
            return {
                code: 200,
                metadata:{
                    data: result.secure_url
                }
            } 
                  
        
                
            
             
          
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    message: err.message,
                    status: 'upload image failed',
                }
            }
        }
    }

    
}

module.exports = ImageService