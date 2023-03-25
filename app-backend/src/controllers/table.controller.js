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

    updateTable = async (req, res, next) => {
        try {
            const result = await TableService.updateTable(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteTable = async (req, res, next) => {
        try {
            const result = await TableService.deleteTable(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    getTableById = async (req, res, next) => {
        try {
            const result = await TableService.getTableById(req.params.tableId);
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