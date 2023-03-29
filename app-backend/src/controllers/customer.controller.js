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

    getCustomerByPhone = async (req, res, next) => {
        try {
            const result = await CustomerService.getCustomerByPhone(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    updateCustomer = async (req, res, next) => {
        try {
            const result = await CustomerService.updateCustomer(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    addCustomer = async (req, res, next) => {
        try {
            const result = await CustomerService.addCustomer(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteCustomer = async (req, res, next) => {
        try {
            const result = await CustomerService.deleteCustomer(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

  
}

module.exports = new CustomerController()