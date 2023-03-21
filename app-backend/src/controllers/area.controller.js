const AreaService = require("../services/area.service");

class AreaController{

    addArea = async (req, res, next) => {
        try {
            const result = await AreaService.addArea(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    updateArea = async (req, res, next) => {
        try {
            const result = await AreaService.updateArea(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteArea = async (req, res, next) => {
        try {
            const result = await AreaService.deleteArea(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    getAllArea = async (req, res, next) => {
        try {
            const result = await AreaService.getAllArea();
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
}

module.exports = new AreaController()