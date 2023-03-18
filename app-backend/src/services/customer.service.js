const customerModel = require("../models/customer.model")

class CustomerService {

    static getCustomerByUserId = async ({MaTaiKhoan}) =>{
        try{
            const customer = await customerModel.findOne({MaTaiKhoan});
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: customer
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get customer error',
                }
                
            }
        }
    }
}

module.exports = CustomerService