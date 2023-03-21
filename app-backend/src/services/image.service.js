
const uploadCloud = require('../config/config.cloudinary');
class ImageService {

    static sendImageAndGetLink = async  ({image}) =>{
        try{
            uploadCloud.single(image)( function (err, result) {
                if (err) {
                    return {
                        code: 500,
                        metadata:{
                            success:false,
                            message: err.message,
                            status: 'upload image failed',
                        }
                    }
                }

                return {
                    code: 200,
                    metadata:{
                        success:true,
                        data: result
                    }
                } 
            });
            
            
                  
        
                
            
             
          
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success:false,
                    message: err.message,
                    status: 'upload image failed',
                }
            }
        }
    }

    
}

module.exports = ImageService