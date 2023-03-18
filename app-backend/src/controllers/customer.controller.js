const CustomerService = require("../services/customer.service");

class CustomerController{

    getCustomerByUserId = async (req, res, next) => {
        try {
            const result = await CustomerService.getCustomerByUserId(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

  
}

module.exports = new CustomerController()