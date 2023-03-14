const AccountService = require("../services/account.service");

class AccountController{

    signUp = async (req, res, next) => {
        try {
            const result = await AccountService.signUp(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

   
}

module.exports = new AccountController()