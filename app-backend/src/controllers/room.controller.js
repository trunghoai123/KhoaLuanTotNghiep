const RoomService = require("../services/room.service");

class RoomController{

    addRoom = async (req, res, next) => {
        try {
            const result = await RoomService.addRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    getAllRoom = async (req, res, next) => {
        try {
            const result = await RoomService.getAllRoom();
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
}

module.exports = new RoomController()