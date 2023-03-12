const TableService = require("../services/table.service");

class TableController{

    addTable = async (req, res, next) => {
        try {
            const result = await TableService.addTable(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 


    getAllTable = async (req, res, next) => {
        try {
            const result = await TableService.getAllTable();
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
}

module.exports = new TableController()