const MenuService = require("../services/menu.service");

class MenuController{


    addMenu = async (req, res, next) => {
        try {

            /**
             * 200 OK
             * 201 created
             */
            return res.status(201).json(MenuService.add(req.body))
        }
        catch (err){
            next(err);
        }
    }
}

module.exports = new MenuController()