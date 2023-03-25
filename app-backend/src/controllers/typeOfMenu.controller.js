const TypeOfMenuService = require("../services/typeOfMenu.service");

class TypeOfMenuController{

    addTypeOfMenu = async (req, res, next) => {
        try {
            const result = await TypeOfMenuService.addTypeOfMenu(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 

    updateTypeOfMenu = async (req, res, next) => {
        try {
            const result = await TypeOfMenuService.updateTypeOfMenu(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteTypeOfMenu = async (req, res, next) => {
        try {
            const result = await TypeOfMenuService.deleteTypeOfMenu(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    // getTableById = async (req, res, next) => {
    //     try {
    //         const result = await TypeOfMenuService.getTableById(req.params.tableId);
    //         return res.status(result.code).json(result.metadata)
    //     }
    //     catch (err){
    //         next(err);
    //     }
    // }

    getAllTypeOfMenu = async (req, res, next) => {
        try {
            const result = await TypeOfMenuService.getAllTypeOfMenu();
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
}

module.exports = new TypeOfMenuController()